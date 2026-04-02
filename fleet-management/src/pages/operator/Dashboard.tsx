import React from 'react'
import Map from '../../components/map/Map'

const OperatorDashboard: React.FC = () => {
  return (
    <div>
      <h1>Operator Dashboard</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <Map />
      </div>
      {/* Other dashboard content */}
    </div>
  )
}

export default OperatorDashboard