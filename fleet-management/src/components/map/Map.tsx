import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMapVehicles } from '../../hooks/map/useMapData'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

interface MapProps {
  className?: string
}

const Map: React.FC<MapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const { vehicles } = useMapVehicles()
  const [mapError, setMapError] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const hasValidToken = mapboxgl.accessToken && mapboxgl.accessToken !== 'your_mapbox_access_token_here'

  useEffect(() => {
    if (!hasValidToken) {
      return
    }

    console.log('Initializing map...')
    if (map.current) return // initialize map only once

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [25, -30], // lng, lat for South Africa
        zoom: 5,
      })

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('Failed to load map. Please check your internet connection and Mapbox token.')
      })

      map.current.on('load', () => {
        console.log('Map loaded successfully')
        setMapError(null)
        setMapLoaded(true)
        // Add navigation control
        map.current!.addControl(new mapboxgl.NavigationControl(), 'top-right')
      })
    } catch (error) {
      console.error('Map initialization error:', error)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMapError('Failed to initialize map.')
    }
  }, [hasValidToken])

  useEffect(() => {
    if (!map.current || !vehicles || mapError || !mapLoaded) return

    console.log('Adding vehicles layer', vehicles)
    try {
      // Remove existing layer if it exists
      if (map.current.getLayer('vehicles')) {
        map.current.removeLayer('vehicles')
      }
      if (map.current.getSource('vehicles')) {
        map.current.removeSource('vehicles')
      }

      // Add vehicle data
      map.current.addSource('vehicles', {
        type: 'geojson',
        data: vehicles,
      })

      map.current.addLayer({
        id: 'vehicles',
        type: 'circle',
        source: 'vehicles',
        paint: {
          'circle-radius': 10,
          'circle-color': '#00ff00', // brighter green for visibility
        },
      })
      console.log('Vehicles layer added')
    } catch (error) {
      console.error('Layer error:', error)
    }
  }, [vehicles, mapError, mapLoaded])

  if (!hasValidToken || mapError) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#16171d', color: '#9ca3af' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Map Error</h2>
          <p>{!hasValidToken ? 'Invalid or missing Mapbox access token. Please check your .env file.' : mapError}</p>
          <p>Get a token from <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">Mapbox Account</a></p>
        </div>
      </div>
    )
  }

  return <div ref={mapContainer} className={className} style={{ width: '100%', height: '100%' }} />
}

export default Map