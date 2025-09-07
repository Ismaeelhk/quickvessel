'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface SignupFormProps {
    onSuccess?: () => void
    onSwitchToLogin?: () => void
}

export default function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        businessType: '',
        agreeToTerms: false
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
        ? createBrowserClient(supabaseUrl, supabaseAnonKey)
        : null

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                return formData.email && formData.password && formData.confirmPassword && formData.fullName
            case 2:
                return formData.phone && formData.company && formData.businessType
            case 3:
                return formData.address && formData.city && formData.state && formData.zipCode && formData.country && formData.agreeToTerms
            default:
                return false
        }
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps))
            setError('')
        } else {
            setError('Please fill in all required fields')
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1))
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (!formData.agreeToTerms) {
            setError('Please agree to the terms and conditions')
            return
        }

        setLoading(true)
        setError('')

        if (!supabase) {
            setError('Supabase not configured. Please set up your environment variables.')
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        phone: formData.phone,
                        company: formData.company,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zip_code: formData.zipCode,
                        country: formData.country,
                        business_type: formData.businessType,
                    },
                },
            })

            if (error) {
                setError(error.message)
            } else if (data.user) {
                // Create user record in public.users table as fallback
                try {
                    const { error: userError } = await supabase
                        .from('users')
                        .insert({
                            id: data.user.id,
                            email: data.user.email,
                            full_name: formData.fullName,
                            role: 'user'
                        })

                    if (userError) {
                        console.warn('Failed to create user record:', userError)
                        // Don't fail the signup if this fails - the trigger should handle it
                    }
                } catch (userErr) {
                    console.warn('Error creating user record:', userErr)
                    // Don't fail the signup if this fails
                }

                onSuccess?.()
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name *
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password *
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password *
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                Phone Number *
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                Company Name *
                            </label>
                            <input
                                id="company"
                                name="company"
                                type="text"
                                autoComplete="organization"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your company name"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                                Business Type *
                            </label>
                            <select
                                id="businessType"
                                name="businessType"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={formData.businessType}
                                onChange={handleInputChange}
                            >
                                <option value="">Select business type</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="logistics">Logistics</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Finance</option>
                                <option value="technology">Technology</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                                Street Address *
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                autoComplete="street-address"
                                required
                                className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your street address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                                    City *
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    required
                                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                                    State *
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    autoComplete="address-level1"
                                    required
                                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-2">
                                    ZIP Code *
                                </label>
                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    autoComplete="postal-code"
                                    required
                                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="ZIP Code"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                                    Country *
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    required
                                    className="w-full px-4 py-3 border border-slate-600 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                    <option value="DE">Germany</option>
                                    <option value="FR">France</option>
                                    <option value="JP">Japan</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                required
                                className="mt-1 h-4 w-4 text-blue-600 border-slate-600 bg-slate-800 rounded focus:ring-blue-500 focus:ring-2"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                                I agree to the{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="w-full">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white font-serif mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Step {currentStep} of {totalSteps}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>

                    <p className="text-sm text-gray-400">
                        Or{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            sign in to existing account
                        </button>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {renderStep()}

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-300 text-sm p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                        {currentStep > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                Previous
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
