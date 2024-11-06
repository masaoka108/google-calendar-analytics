'use client'

import { useState } from 'react'
import { GoogleAuth } from '../components/components-google-auth'
import { DataVisualizationComponent } from '../components/components-data-visualization'
import { fetchAndAggregateEvents } from './app-actions'
import { Button } from "@/components/ui/button"

export default function Page() {
  const [token, setToken] = useState<string | null>(null)
  const [data, setData] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleAuthComplete = async (newToken: string) => {
    console.log('handleAuthComplete 新しいトークン:', newToken)
    setToken(newToken)
    await fetchData(newToken, currentDate)
  }

  const fetchData = async (token: string, date: Date) => {
    const result = await fetchAndAggregateEvents(token, date.getFullYear(), date.getMonth() + 1)
    setData(result)
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(newDate)
    if (token) fetchData(token, newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(newDate)
    if (token) fetchData(token, newDate)
  }

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
          <DataVisualizationComponent data={data} />
        </div>
      )}
    </div>
  )
}