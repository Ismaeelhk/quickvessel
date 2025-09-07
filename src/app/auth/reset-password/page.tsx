'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isValidSession, setIsValidSession] = useState(false)
    const [checkingSession, setCheckingSession] = useState(true)

    const router = useRouter()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
        ? createBrowserClient(supabaseUrl, supabaseAnonKey)
        : null

    useEffect(() => {
        const checkSession = async () => {
            if (!supabase) {
                setError('Supabase not configured')
                setCheckingSession(false)
                return
            }

            try {
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) {
                    setError('Invalid or expired reset link')
                    setCheckingSession(false)
                    return
                }

                if (!session) {
                    setError('No active session found. Please request a new password reset.')
                    setCheckingSession(false)
                    return
                }

                setIsValidSession(true)
            } catch (err) {
                setError('An error occurred while verifying your session')
            } finally {
                setCheckingSession(false)
            }
        }

        checkSession()
    }, [supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            setLoading(false)
            return
        }

        if (!supabase) {
            setError('Supabase not configured')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
                // Redirect to app after 3 seconds
                setTimeout(() => {
                    router.push('/app')
                }, 3000)
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (checkingSession) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Verifying your reset link...</p>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white font-serif mb-4">
                                Password Reset Successful!
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Your password has been successfully updated. You will be redirected to the app shortly.
                            </p>
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mb-6">
                                <p className="text-green-300 text-sm">
                                    You can now sign in with your new password.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push('/app')}
                                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium"
                            >
                                Go to App
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!isValidSession) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
                                <AlertCircle className="w-8 h-8 text-red-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white font-serif mb-4">
                                Invalid Reset Link
                            </h2>
                            <p className="text-gray-300 mb-6">
                                {error || 'This password reset link is invalid or has expired.'}
                            </p>
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
                                <p className="text-red-300 text-sm">
                                    Please request a new password reset link from the login page.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push('/auth')}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white font-serif mb-2">
                            Create New Password
                        </h2>
                        <p className="text-sm text-gray-400">
                            Enter your new password below
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 py-3 pr-10 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="w-full px-4 py-3 pr-10 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Confirm your new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                            <p className="text-blue-300 text-sm">
                                <strong>Password Requirements:</strong>
                            </p>
                            <ul className="text-blue-300/80 text-sm mt-2 space-y-1">
                                <li>• At least 6 characters long</li>
                                <li>• Use a combination of letters and numbers</li>
                                <li>• Avoid common passwords</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating Password...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
