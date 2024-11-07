import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from 'chart.js/auto'

interface EventData {
  title: string
  duration: number
  isVisible?: boolean
}

export function DataVisualizationComponent({ data }: { data: EventData[] }) {
  const [localData, setLocalData] = useState<EventData[]>([])
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    setLocalData(data)
  }, [data])

  useEffect(() => {
    if (!chartRef.current || !localData.length) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const visibleData = localData.filter(item => item.isVisible !== false)

    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: visibleData.map(item => item.title),
        datasets: [{
          data: visibleData.map(item => item.duration),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            display: true
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [localData])

  const handleCheckboxChange = (index: number) => {
    setLocalData(prev => prev.map((item, i) => 
      i === index ? { ...item, isVisible: !item.isVisible } : item
    ))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <div className="text-sm text-muted-foreground">
            Total: {localData
              .filter(item => item.isVisible !== false)
              .reduce((acc, item) => acc + item.duration, 0)
              .toFixed(2)} hours
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {localData.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.isVisible !== false}
                  onChange={() => handleCheckboxChange(index)}
                  className="h-4 w-4"
                />
                <div className="flex justify-between flex-1">
                  <span style={{ color: item.isVisible !== false ? 'inherit' : '#888' }}>
                    {item.title}
                  </span>
                  <span style={{ color: item.isVisible !== false ? 'inherit' : '#888' }}>
                    {item.duration.toFixed(2)} hours
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas ref={chartRef} />
        </CardContent>
      </Card>
    </div>
  )
}