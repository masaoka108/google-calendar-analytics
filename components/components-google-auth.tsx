'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleAuthProps {
  onAuthComplete: (token: string) => void
}

export function GoogleAuth({ onAuthComplete }: GoogleAuthProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      initGoogle()
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const initGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    })
    setIsInitialized(true)
  }

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential
    console.log('認証成功:', token)
    onAuthComplete(token)
  }

  const handleAuthClick = () => {
    if (!isInitialized) return

    window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: (response: any) => {
        if (response.access_token) {
          onAuthComplete(response.access_token)
        }
      },
    }).requestAccessToken()
  }

  return (
    <Button onClick={handleAuthClick} disabled={!isInitialized}>
      Googleでサインイン
    </Button>
  )
}