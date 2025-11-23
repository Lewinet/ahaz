'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useDriverLocation } from '@/lib/hooks/use-driver-location'
import { useMode } from '@/components/providers/mode-provider'
import { clsx } from 'clsx'

// Fix for default marker icon
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
})

function LocationMarker({ setLocation }: { setLocation: (loc: [number, number]) => void }) {
    const map = useMapEvents({
        click(e) {
            // Allow picking destination? For now just tracking user
        },
        locationfound(e) {
            setLocation([e.latlng.lat, e.latlng.lng])
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    useEffect(() => {
        map.locate()
    }, [map])

    return null
}

import { requestRide } from '@/lib/actions/ride'
import { goOnline, getPendingRides, acceptRide } from '@/lib/actions/driver'

export default function MapView() {
    const [mounted, setMounted] = useState(false)
    const [location, setLocation] = useState<[number, number] | null>(null)
    const { mode } = useMode()
    const [isOnline, setIsOnline] = useState(false)
    const [requesting, setRequesting] = useState(false)
    const [pendingRides, setPendingRides] = useState<any[]>([])

    const drivers = useDriverLocation(mode === 'driver', isOnline)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Poll for pending rides if Driver + Online
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (mode === 'driver' && isOnline) {
            const fetchRides = async () => {
                const rides = await getPendingRides()
                setPendingRides(rides)
            }
            fetchRides()
            interval = setInterval(fetchRides, 5000)
        }
        return () => clearInterval(interval)
    }, [mode, isOnline])

    const handleGoOnline = async () => {
        const newState = !isOnline
        setIsOnline(newState)
        await goOnline(newState)
    }

    const handleRequestRide = async () => {
        if (!location) return
        setRequesting(true)
        const result = await requestRide(
            { lat: location[0], lng: location[1] },
            "Destination Mock"
        )
        setRequesting(false)
        if (result.success) {
            alert('Ride requested! Waiting for driver...')
        } else {
            alert('Error: ' + result.error)
        }
    }

    const handleAcceptRide = async (rideId: string) => {
        const result = await acceptRide(rideId)
        if (result.success) {
            alert('Ride Accepted! Go pick up the passenger.')
            // Refresh list
            const rides = await getPendingRides()
            setPendingRides(rides)
        } else {
            alert('Error: ' + result.error)
        }
    }

    if (!mounted) return <div className="h-full w-full bg-gray-100 animate-pulse" />

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setLocation={setLocation} />

                {location && (
                    <Marker position={location} icon={icon}>
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {Object.values(drivers).map((driver) => (
                    <Marker
                        key={driver.user_id}
                        position={[driver.lat, driver.lng]}
                        icon={carIcon}
                    >
                        <Popup>Driver</Popup>
                    </Marker>
                ))}

                {/* Show Pending Rides on Map? Or just list? Let's do markers for rides too if we had coords */}
                {pendingRides.map(ride => (
                    <Marker
                        key={ride.id}
                        position={[ride.origin_lat, ride.origin_lng]}
                        icon={icon} // Use different icon for passenger
                    >
                        <Popup>
                            <div className="p-2">
                                <p className="font-bold">Passenger Waiting</p>
                                <p>Fare: ${ride.fare_total}</p>
                                <button
                                    onClick={() => handleAcceptRide(ride.id)}
                                    className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-xs"
                                >
                                    Accept
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

            {/* Driver Controls */}
            {mode === 'driver' && (
                <>
                    <div className="absolute top-4 right-4 z-[1000] w-64 space-y-2">
                        {isOnline && pendingRides.map(ride => (
                            <div key={ride.id} className="bg-white p-3 rounded-lg shadow-md border-l-4 border-indigo-500">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800">Ride Request</span>
                                    <span className="text-green-600 font-bold">${ride.fare_total}</span>
                                </div>
                                <button
                                    onClick={() => handleAcceptRide(ride.id)}
                                    className="mt-2 w-full bg-indigo-600 text-white py-1 rounded text-sm hover:bg-indigo-700"
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
                        <button
                            onClick={handleGoOnline}
                            className={clsx(
                                "px-6 py-3 rounded-full font-bold shadow-lg transition-all",
                                isOnline
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-green-500 text-white hover:bg-green-600"
                            )}
                        >
                            {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
                        </button>
                    </div>
                </>
            )}

            {/* Consumer Controls */}
            {mode === 'consumer' && (
                <div className="absolute bottom-8 left-4 right-4 z-[1000]">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-semibold text-gray-900">Where to?</h3>
                        <div className="mt-2 flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter destination"
                                className="flex-1 rounded-md border border-gray-300 p-2 text-sm"
                            />
                            <button
                                onClick={handleRequestRide}
                                disabled={requesting || !location}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                            >
                                {requesting ? 'Requesting...' : 'Request Ride'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
