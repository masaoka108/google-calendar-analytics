'use server'

import { google } from 'googleapis'

export async function fetchAndAggregateEvents(token: string, year: number, month: number) {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: token })

  const calendar = google.calendar({ version: 'v3', auth })

  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []

    const aggregatedData = events.reduce((acc, event) => {
      const title = event.summary || 'Untitled'
      const start = new Date(event.start?.dateTime || event.start?.date || '')
      const end = new Date(event.end?.dateTime || event.end?.date || '')
      const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

      if (acc[title]) {
        acc[title] += duration
      } else {
        acc[title] = duration
      }

      return acc
    }, {} as Record<string, number>)

    return Object.entries(aggregatedData).map(([title, duration]) => ({
      title,
      duration: Number(duration.toFixed(2))
    }))
  } catch (error) {
    console.error('Error fetching calendar data:', error)
    return []
  }
}