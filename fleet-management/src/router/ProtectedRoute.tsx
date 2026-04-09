import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSession } from '../hooks/auth/useSession'
import { Loader } from '../components/common/Loader'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useSession()

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
