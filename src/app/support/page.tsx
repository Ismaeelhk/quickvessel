'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { MessageCircle, Send, CheckCircle, AlertCircle, Clock, Star } from 'lucide-react'

interface SupportMessage {
    id: string
    subject: string
    message: string
    status: 'open' | 'in_progress' | 'resolved' | 'closed'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    created_at: string
    updated_at: string
    replies?: SupportReply[]
}

interface SupportReply {
    id: string
    message: string
    is_admin_reply: boolean
    created_at: string
    users?: {
        id: string
        email: string
        full_name?: string
    }
}

export default function SupportPage() {
    const { user, loading } = useAuth()
    const [showForm, setShowForm] = useState(false)
    const [messages, setMessages] = useState<SupportMessage[]>([])
    const [loadingMessages, setLoadingMessages] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent'
    })

    useEffect(() => {
        if (user && !loading) {
            fetchMessages()
        }
    }, [user, loading])

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/support-messages')
            const data = await response.json()
            if (data.supportMessages) {
                setMessages(data.supportMessages)
            }
            // mark support as seen
            await fetch('/api/support-unread', { method: 'POST' })
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoadingMessages(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.subject || !formData.message) return

        setSubmitting(true)
        try {
            const response = await fetch('/api/support-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setFormData({ subject: '', message: '', priority: 'medium' })
                setShowForm(false)
                fetchMessages()
            }
        } catch (error) {
            console.error('Error submitting message:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'open':
                return <Clock className="w-4 h-4 text-yellow-500" />
            case 'in_progress':
                return <AlertCircle className="w-4 h-4 text-blue-500" />
            case 'resolved':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'closed':
                return <CheckCircle className="w-4 h-4 text-gray-500" />
            default:
                return <Clock className="w-4 h-4 text-gray-500" />
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'text-red-500 bg-red-100'
            case 'high':
                return 'text-orange-500 bg-orange-100'
            case 'medium':
                return 'text-yellow-500 bg-yellow-100'
            case 'low':
                return 'text-green-500 bg-green-100'
            default:
                return 'text-gray-500 bg-gray-100'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Please log in to access support</h1>
                    <a href="/auth" className="text-blue-400 hover:text-blue-300">Go to Login</a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white font-serif">Support Center</h1>
                                <p className="text-gray-400">Get help with your shipments and account</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>New Message</span>
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="space-y-4">
                    {loadingMessages ? (
                        <div className="text-center py-8">
                            <div className="text-white">Loading messages...</div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No support messages yet</h3>
                            <p className="text-gray-400 mb-6">Send us a message and we'll get back to you soon!</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
                            >
                                Send First Message
                            </button>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-white">{message.subject}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                                                {message.priority.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span>Created: {new Date(message.created_at).toLocaleDateString()}</span>
                                            <div className="flex items-center space-x-1">
                                                {getStatusIcon(message.status)}
                                                <span className="capitalize">{message.status.replace('_', ' ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Replies */}
                                {message.replies && message.replies.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                                        <h4 className="text-sm font-medium text-gray-400 mb-3">Replies ({message.replies.length})</h4>
                                        <div className="space-y-3">
                                            {message.replies.map((reply) => (
                                                <div key={reply.id} className={`p-3 rounded-lg ${reply.is_admin_reply
                                                    ? 'bg-blue-900/20 border border-blue-500/30'
                                                    : 'bg-slate-700/30 border border-slate-600/30'
                                                    }`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center space-x-2">
                                                            <span className={`text-xs font-medium ${reply.is_admin_reply ? 'text-blue-400' : 'text-gray-400'
                                                                }`}>
                                                                {reply.is_admin_reply ? 'Admin' : 'You'}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {new Date(reply.created_at).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-300">{reply.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* New Message Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-2xl">
                            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 rounded-t-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Send className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white font-serif">Send Support Message</h3>
                                            <p className="text-sm text-gray-400">We'll get back to you within 24 hours</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Brief description of your issue"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Priority
                                    </label>
                                    <select
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                                    >
                                        <option value="low">Low - General inquiry</option>
                                        <option value="medium">Medium - Standard issue</option>
                                        <option value="high">High - Urgent issue</option>
                                        <option value="urgent">Urgent - Critical problem</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                        placeholder="Please describe your issue in detail..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        disabled={submitting}
                                        className="flex-1 px-6 py-3 border border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
