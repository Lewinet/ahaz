'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { getProfile, signOut } from '@/lib/actions/profile'
import { User, Moon, Sun, LogOut, ChevronRight, Shield, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function load() {
            setLoading(true)
            const data = await getProfile()
            setProfile(data)
            setLoading(false)
        }
        load()
    }, [])

    const handleSignOut = async () => {
        await signOut()
        router.push('/login')
    }

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading settings...</div>
    }

    return (
        <div className="max-w-md mx-auto p-4 pb-24 space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            </header>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User size={32} className="text-gray-400" />
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{profile?.full_name || 'User'}</h2>
                    <p className="text-sm text-gray-500">{profile?.email}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1 capitalize">
                        {profile?.role || 'User'}
                    </span>
                </div>
            </div>

            {/* Appearance */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">Appearance</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
                        </div>
                        <div className={`w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative transition-colors ${theme === 'dark' ? '!bg-purple-600' : ''}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === 'dark' ? 'translate-x-5' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Account Settings */}
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider ml-1">Account</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Shield size={18} />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Security & Privacy</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                <CreditCard size={18} />
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Payment Methods</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                    </button>
                </div>
            </div>

            <button
                onClick={handleSignOut}
                className="w-full p-4 flex items-center justify-center gap-2 text-red-600 font-medium bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
                <LogOut size={18} />
                Sign Out
            </button>
        </div>
    )
}
