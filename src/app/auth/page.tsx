'use client'

import { useState } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const handleSuccess = () => {
        // Redirect to app after successful authentication
        window.location.href = '/app'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="flex min-h-screen">
                {/* Left Side - Image/Visual */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-white font-serif mb-4">
                                Welcome to QuickVessel
                            </h1>
                            <p className="text-xl text-gray-300 font-light max-w-md">
                                Streamline your business operations with our comprehensive BPO services and advanced package tracking system.
                            </p>
                        </div>

                        {/* Feature highlights */}
                        <div className="space-y-4 text-left max-w-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-gray-300">Real-time package tracking</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-gray-300">Advanced logistics management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-gray-300">24/7 customer support</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                <span className="text-gray-300">HIPAA & ISO certified</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-lg"></div>
                </div>

                {/* Right Side - Auth Forms */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {showForgotPassword ? (
                            <ForgotPasswordForm
                                onBackToLogin={() => setShowForgotPassword(false)}
                                onSuccess={() => setShowForgotPassword(false)}
                            />
                        ) : isLogin ? (
                            <LoginForm
                                onSuccess={handleSuccess}
                                onSwitchToSignup={() => setIsLogin(false)}
                                onForgotPassword={() => setShowForgotPassword(true)}
                            />
                        ) : (
                            <SignupForm
                                onSuccess={handleSuccess}
                                onSwitchToLogin={() => setIsLogin(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
