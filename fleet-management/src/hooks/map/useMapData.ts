import { useState, useEffect } from 'react'
// import { supabase } from '../../lib/supabaseClient' // Commented out since Supabase not implemented

interface VehiclePosition {
  id: string
  latitude: number
  longitude: number
  type: string
}

// Mock data for development
const mockVehicles: VehiclePosition[] = [
  { id: '1', latitude: -26.2041, longitude: 28.0473, type: 'truck' }, // Johannesburg
  { id: '2', latitude: -33.9249, longitude: 18.4241, type: 'van' }, // Cape Town
  { id: '3', latitude: -29.0852, longitude: 26.1597, type: 'car' }, // Bloemfontein
  { id: '4', latitude: -25.7479, longitude: 28.2293, type: 'truck' }, // Pretoria
  { id: '5', latitude: -27.7700, longitude: 30.7920, type: 'van' }, // Durban
]

export const useMapVehicles = () => {
  const [vehicles, setVehicles] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicles = async () => {
    try {
      // Mock fetch - replace with Supabase when implemented
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate delay

      // Convert to GeoJSON FeatureCollection
      const features = mockVehicles.map((vehicle: VehiclePosition) => ({
        type: 'Feature',
        properties: {
          id: vehicle.id,
          type: vehicle.type,
        },
        geometry: {
          type: 'Point',
          coordinates: [vehicle.longitude, vehicle.latitude],
        },
      }))

      const geoJson = {
        type: 'FeatureCollection',
        features,
      }

      setVehicles(geoJson)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
    const interval = setInterval(fetchVehicles, 30000) // 30 seconds
    return () => clearInterval(interval)
  }, [])

  return { vehicles, loading, error, refetch: fetchVehicles }
}

export const useMapVehicle = (id: string) => {
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVehicle = async () => {
    try {
      // Mock fetch
      await new Promise(resolve => setTimeout(resolve, 500))

      const data = mockVehicles.find(v => v.id === id)
      if (!data) throw new Error('Vehicle not found')

      const feature = {
        type: 'Feature',
        properties: {
          id: data.id,
          type: data.type,
        },
        geometry: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude],
        },
      }

      setVehicle(feature)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchVehicle()
      const interval = setInterval(fetchVehicle, 30000)
      return () => clearInterval(interval)
    }
  }, [id])

  return { vehicle, loading, error, refetch: fetchVehicle }
}