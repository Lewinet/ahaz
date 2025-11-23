'use client'

import { usePathname } from 'next/navigation'
import { BottomNav } from '@/components/navigation/bottom-nav'

export function ConditionalBottomNav() {
    const pathname = usePathname()

    // Don't show bottom nav on login page or public pages
    const hideBottomNav = pathname === '/login' || pathname === '/auth/callback'

    if (hideBottomNav) {
        return null
    }

    return <BottomNav />
}
