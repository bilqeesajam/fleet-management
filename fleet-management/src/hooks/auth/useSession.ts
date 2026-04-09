import { useEffect, useState } from 'react'

export interface MockSession {
  user: {
    id: string
    email: string
    user_metadata: {
      role: 'admin' | 'operator'
    }
  }
}

export function useSession() {
  const [session, setSession] = useState<MockSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth state check from localStorage
    const storedSession = localStorage.getItem('auth_session')
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession))
      } catch {
        localStorage.removeItem('auth_session')
      }
    }
    setLoading(false)
  }, [])

  return { session, loading }
}