import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth/useAuth'
import type { UserRole } from '../hooks/auth/useAuth'
import { Loader } from '../components/common/Loader'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: UserRole[]
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { role, loading } = useAuth()

  if (loading) {
    return <Loader />
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard based on role
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/operator/dashboard" replace />
  }

  return <>{children}</>
}
