'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wallet, ShoppingBag, User, Car } from 'lucide-react'
import { clsx } from 'clsx'

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/transactions', icon: Wallet, label: 'Wallet' },
        { href: '/map', icon: Car, label: 'Ride' },
        { href: '/market', icon: ShoppingBag, label: 'Shop' },
        { href: '/settings', icon: User, label: 'Profile' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom">
            <div className="max-w-md mx-auto px-2 py-2">
                <div className="flex items-center justify-around">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px]',
                                    isActive
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                )}
                            >
                                <Icon size={22} className={isActive ? 'scale-110' : ''} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
