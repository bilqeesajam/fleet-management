import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MapPage from './pages/map/MapPage'
import OperatorDashboard from './pages/operator/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/operator/dashboard" element={<OperatorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Navigate to="/map" replace />} />
      </Routes>
    </Router>
  )
}

export default App
