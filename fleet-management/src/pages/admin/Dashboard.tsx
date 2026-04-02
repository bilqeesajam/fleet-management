import React from 'react'
import Map from '../../components/map/Map'

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <Map />
      </div>
      {/* Other dashboard content */}
    </div>
  )
}

export default AdminDashboard