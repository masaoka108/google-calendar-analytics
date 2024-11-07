'use client'

import { useState, useEffect } from 'react'
import { GoogleAuth } from '../components/components-google-auth'
import { DataVisualizationComponent } from '../components/components-data-visualization'
import { fetchAndAggregateEvents } from './app-actions'
import { Button } from "@/components/ui/button"

interface EventData {
  title: string;
  duration: number;
  isVisible?: boolean;
}

export default function Page() {
  const [token, setToken] = useState<string | null>(null)
  const [data, setData] = useState<EventData[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAuthComplete = async (newToken: string) => {
    console.log('handleAuthComplete 新しいトークン:', newToken)
    setToken(newToken)
    await fetchData(newToken, currentDate)
  }

  const fetchData = async (token: string, date: Date) => {
    const result = await fetchAndAggregateEvents(token, date.getFullYear(), date.getMonth() + 1)
    if (!result) return
    setData(result.map(item => ({ ...item, isVisible: true }))
      .sort((a, b) => b.duration - a.duration))
  }

  const handlePrevMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(newDate)
    if (token) await fetchData(token, newDate)
  }

  const handleNextMonth = async () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(newDate)
    if (token) await fetchData(token, newDate)
  }

  const handleCheckboxChange = (index: number) => {
    setData(prev => prev.map((item, i) => 
      i === index ? { ...item, isVisible: !item.isVisible } : item
    ))
  }

  const handleFetch = async () => {
    if (!token) return
    const result = await fetchAndAggregateEvents(token, currentDate.getFullYear(), currentDate.getMonth() + 1)
    if (!result) return
    setData(result.sort((a, b) => b.duration - a.duration))
  }

  useEffect(() => {
    if (token) {
      handleFetch()
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