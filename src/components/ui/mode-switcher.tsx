'use client'

import { Car, ShoppingBag, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useMode } from '@/components/providers/mode-provider'

export function ModeSwitcher() {
    const { mode, setMode } = useMode()

    return (
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
                onClick={() => setMode('consumer')}
                className={clsx(
                    'p-2 rounded-md transition-all',
                    mode === 'consumer' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                )}
                title="Consumer Mode"
            >
                <User size={20} />
            </button>
            <button
                onClick={() => setMode('driver')}
                className={clsx(
                    'p-2 rounded-md transition-all',
                    mode === 'driver' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'
                )}
                title="Driver Mode"
            >
                <Car size={20} />
            </button>
            <button
                onClick={() => setMode('merchant')}
                className={clsx(
                    'p-2 rounded-md transition-all',
                    mode === 'merchant' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-700'
                )}
                title="Merchant Mode"
            >
                <ShoppingBag size={20} />
            </button>
        </div>
    )
}
