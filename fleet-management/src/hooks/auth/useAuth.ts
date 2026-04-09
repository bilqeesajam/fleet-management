import { useEffect, useState } from 'react'
import { useSession, type MockSession } from './useSession'

export type UserRole = 'admin' | 'operator'

interface AuthState {
  user: MockSession['user'] | null
  role: UserRole | null
  loading: boolean
  error: string | null
}

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

// Mock credentials for development
const MOCK_USERS = [
  { email: 'admin@example.com', password: 'password', role: 'admin' as UserRole },
  { email: 'operator@example.com', password: 'password', role: 'operator' as UserRole },
]

export function useAuth(): UseAuthReturn {
  const { session, loading: sessionLoading } = useSession()
  const [state, setState] = useState<AuthState>({
    user: null,
    role: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!sessionLoading) {
      if (session?.user) {
        const role = (session.user.user_metadata?.role as UserRole) || null
        setState({
          user: session.user,
          role,
          loading: false,
          error: null,
        })
      } else {
        setState({
          user: null,
          role: null,
          loading: false,
          error: null,
        })
      }
    }
  }, [session, sessionLoading])

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, error: null, loading: true }))

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock authentication
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      )

      if (!user) {
        setState((prev) => ({
          ...prev,
          error: 'Invalid email or password',
          loading: false,
        }))
        return
      }

      // Create mock session
      const mockSession: MockSession = {
        user: {
          id: `user_${Date.now()}`,
          email,
          user_metadata: {
            role: user.role,
          },
        },
      }

      // Persist to localStorage
      localStorage.setItem('auth_session', JSON.stringify(mockSession))

      setState({
        user: mockSession.user,
        role: user.role,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setState((prev) => ({
        ...prev,
        error: 'Invalid email or password',
        loading: false,
      }))
    }
  }

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }))

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Clear session from localStorage
      localStorage.removeItem('auth_session')

      setState({
        user: null,
        role: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error('Sign out error:', error)
      setState((prev) => ({
        ...prev,
        error: 'Failed to sign out',
        loading: false,
      }))
    }
  }

  return {
    ...state,
    signIn,
    signOut,
  }
}
