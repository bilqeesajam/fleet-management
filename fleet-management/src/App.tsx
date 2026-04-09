import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './router/ProtectedRoute'
import { RoleGuard } from './router/RoleGuard'
import MapPage from './pages/map/MapPage'
import OperatorDashboard from './pages/operator/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import Login from './pages/auth/Login'

function AppContent() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Operator routes */}
      <Route
        path="/operator/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={['operator']}>
              <OperatorDashboard />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  )
}

export default App

