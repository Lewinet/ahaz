'use client'

import dynamic from 'next/dynamic'
import { ModeSwitcher } from '@/components/ui/mode-switcher'

const MapView = dynamic(() => import('@/components/map/map-view'), {
    ssr: false,
    loading: () => <div className="h-[calc(100vh-64px)] w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>
})

export default function MapPage() {
    return (
        <div className="flex h-screen flex-col">
            <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm z-10">
                <h1 className="text-xl font-bold text-indigo-900">Ride</h1>
                <ModeSwitcher />
            </header>
            <div className="flex-1 relative z-0">
                <MapView />
            </div>
        </div>
    )
}
