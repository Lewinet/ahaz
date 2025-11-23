'use client'

import { useState, useEffect } from 'react'
import { getPendingRides, acceptRide, goOnline } from '@/lib/actions/driver'
import { MapPin, Navigation, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export default function DriverRidesPage() {
    const [rides, setRides] = useState<any[]>([])
    const [isOnline, setIsOnline] = useState(false)
    const [loading, setLoading] = useState(true)
    const [accepting, setAccepting] = useState<string | null>(null)

    const fetchRides = async () => {
        setLoading(true)
        const data = await getPendingRides()
        setRides(data || [])
        setLoading(false)
    }

    useEffect(() => {
        fetchRides()
    }, [])

    const handleGoOnline = async () => {
        const newState = !isOnline
        const res = await goOnline(newState)
        if (res.success) {
            setIsOnline(newState)
        } else {
            alert('Failed to update status: ' + res.error)
        }
    }

    const handleAcceptRide = async (rideId: string) => {
        setAccepting(rideId)
        const res = await acceptRide(rideId)
        if (res.success) {
            alert('Ride accepted!')
            fetchRides() // Refresh list
        } else {
            alert('Failed to accept ride: ' + res.error)
        }
        setAccepting(null)
    }

    return (
        <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Driver Console</h1>
                <button
                    onClick={handleGoOnline}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${isOnline
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {isOnline ? 'Online' : 'Offline'}
                </button>
            </header>

            {isOnline ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Available Rides</h2>
                        <button onClick={fetchRides} className="p-2 text-gray-500 hover:text-gray-700">
                            <RefreshCw size={20} />
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8 text-gray-500">Loading rides...</div>
                    ) : rides.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500">No rides available nearby.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {rides.map((ride) => (
                                <div key={ride.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                ${ride.fare_total?.toFixed(2)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(ride.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={18} className="text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">Pickup</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {ride.origin_lat.toFixed(4)}, {ride.origin_lng.toFixed(4)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Navigation size={18} className="text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">Dropoff</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {ride.dest_lat.toFixed(4)}, {ride.dest_lng.toFixed(4)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAcceptRide(ride.id)}
                                        disabled={!!accepting}
                                        className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {accepting === ride.id ? (
                                            'Accepting...'
                                        ) : (
                                            <>
                                                <CheckCircle size={18} />
                                                Accept Ride
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">You are offline</h3>
                    <p className="text-gray-500 mb-6">Go online to start receiving ride requests.</p>
                    <button
                        onClick={handleGoOnline}
                        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                        Go Online
                    </button>
                </div>
            )}
        </div>
    )
}
