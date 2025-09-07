'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

interface ForgotPasswordFormProps {
    onBackToLogin?: () => void
    onSuccess?: () => void
}

export default function ForgotPasswordForm({ onBackToLogin, onSuccess }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
        ? createBrowserClient(supabaseUrl, supabaseAnonKey)
        : null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (!supabase) {
            setError('Supabase not configured. Please set up your environment variables.')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess(true)
                onSuccess?.()
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="w-full">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white font-serif mb-4">
                            Check Your Email
                        </h2>
                        <p className="text-gray-300 mb-6">
                            We've sent a password reset link to <strong className="text-white">{email}</strong>
                        </p>
                        <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 mb-6">
                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-left">
                                    <p className="text-blue-300 text-sm">
                                        <strong>Next steps:</strong>
                                    </p>
                                    <ul className="text-blue-300/80 text-sm mt-2 space-y-1">
                                        <li>• Check your email inbox (and spam folder)</li>
                                        <li>• Click the reset link in the email</li>
                                        <li>• Create a new password</li>
                                        <li>• The link expires in 1 hour</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onBackToLogin}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                <div className="text-center mb-8">
                    <button
                        onClick={onBackToLogin}
                        className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </button>
                    <h2 className="text-3xl font-bold text-white font-serif mb-2">
                        Reset Your Password
                    </h2>
                    <p className="text-sm text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="text-left">
                                <p className="text-blue-300 text-sm">
                                    <strong>Security Note:</strong>
                                </p>
                                <p className="text-blue-300/80 text-sm mt-1">
                                    The password reset link will be sent to your email and will expire in 1 hour for security reasons.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    )
}
