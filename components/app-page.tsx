'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { GoogleAuth } from './components-google-auth'
import { DataVisualizationComponent } from './components-data-visualization'
import { fetchAndAggregateEvents } from './app-actions'

interface EventData {
  title: string
  duration: number
}

export default function Page() {
  const [token, setToken] = useState<string>('')
  const [data, setData] = useState<EventData[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAuthComplete = (newToken: string) => {
    setToken(newToken)
  }

  const handlePrevMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    setCurrentDate(newDate)
    if (token) {
      const result = await fetchAndAggregateEvents(token, newDate.getFullYear(), newDate.getMonth() + 1)
      if (result) {
        setData(result.sort((a, b) => b.duration - a.duration))
      }
    }
  }

  const handleNextMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    setCurrentDate(newDate)
    if (token) {
      const result = await fetchAndAggregateEvents(token, newDate.getFullYear(), newDate.getMonth() + 1)
      if (result) {
        setData(result.sort((a, b) => b.duration - a.duration))
      }
    }
  }

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const result = await fetchAndAggregateEvents(
          token,
          currentDate.getFullYear(),
          currentDate.getMonth() + 1
        )
        if (result) {
          setData(result.sort((a, b) => b.duration - a.duration))
        }
      }
      fetchData()
    }
  }, [token])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Calendar Analytics</h1>
      <GoogleAuth onAuthComplete={handleAuthComplete} />
      {token && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={handlePrevMonth}>Previous Month</Button>
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button onClick={handleNextMonth}>Next Month</Button>
          </div>
          {data.length > 0 && <DataVisualizationComponent data={data} />}
        </div>
      )}
    </div>
  )
}