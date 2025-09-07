'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createBrowserClient } from '@supabase/ssr'
import { Shipment, TrackingEvent, User, SupportMessage, SupportReply } from '@/lib/supabase'
import { Package, Plus, Edit, MapPin, Clock, CheckCircle, AlertCircle, Truck, Users, Plane, PlaneTakeoff, PlaneLanding, TrendingUp, Activity, BarChart3, Search, Filter, RefreshCw, Settings, Shield, Database, Eye, EyeOff, ChevronDown, MessageCircle, Send, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
    const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([])
    const [loadingData, setLoadingData] = useState(true)
    const [showAddShipment, setShowAddShipment] = useState(false)
    const [showUpdateStatus, setShowUpdateStatus] = useState(false)
    const [updatingStatus, setUpdatingStatus] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [refreshing, setRefreshing] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const [showSupport, setShowSupport] = useState(false)
    const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([])
    const [selectedSupportMessage, setSelectedSupportMessage] = useState<SupportMessage | null>(null)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [replyMessage, setReplyMessage] = useState('')
    const [submittingReply, setSubmittingReply] = useState(false)
    const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set())
    const [expandedShipmentDetails, setExpandedShipmentDetails] = useState(false)
    const [expandedShipments, setExpandedShipments] = useState<Set<string>>(new Set())
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
        ? createBrowserClient(supabaseUrl, supabaseAnonKey)
        : null

    // Form states
    const [newShipment, setNewShipment] = useState({
        tracking_number: '',
        user_id: '',
        description: '',
        origin: '',
        destination: '',
        weight: '',
        dimensions: '',
        estimated_delivery: ''
    })

    const [statusUpdate, setStatusUpdate] = useState({
        status: '',
        location: '',
        description: ''
    })

    useEffect(() => {
        if (loading) return

        if (!user) {
            console.log('No user found, redirecting to auth')
            router.push('/auth')
            return
        }

        if (user && supabase) {
            checkAdminStatus()
        } else if (user && !supabase) {
            setLoadingData(false)
        }
    }, [user, loading, supabase, router])

    useEffect(() => {
        if (isAdmin && supabase) {
            fetchAllData()
        }
    }, [isAdmin, supabase])

    const checkAdminStatus = async () => {
        if (!supabase) return

        try {
            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', user?.id)
                .single()

            if (error) throw error
            setIsAdmin(data?.role === 'admin')
        } catch (error) {
            console.error('Error checking admin status:', error)
        }
    }

    const fetchAllData = async () => {
        if (!supabase) {
            setLoadingData(false)
            return
        }

        try {
            setLoadingData(true)

            // Fetch shipments
            const { data: shipmentsData, error: shipmentsError } = await supabase
                .from('shipments')
                .select('*')
                .order('created_at', { ascending: false })

            if (shipmentsError) throw shipmentsError

            // Fetch users
            const { data: usersData, error: usersError } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false })

            if (usersError) throw usersError

            setShipments(shipmentsData || [])
            setUsers(usersData || [])
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoadingData(false)
        }
    }

    const fetchTrackingEvents = async (shipmentId: string) => {
        if (!supabase) return

        try {
            const { data, error } = await supabase
                .from('tracking_events')
                .select('*')
                .eq('shipment_id', shipmentId)
                .order('timestamp', { ascending: false })

            if (error) throw error
            setTrackingEvents(data || [])
        } catch (error) {
            console.error('Error fetching tracking events:', error)
        }
    }

    const handleAddShipment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!supabase) return

        try {
            const { data: insertedShipment, error } = await supabase
                .from('shipments')
                .insert([{
                    ...newShipment,
                    weight: newShipment.weight ? parseFloat(newShipment.weight) : null,
                    estimated_delivery: newShipment.estimated_delivery || null,
                    current_location: newShipment.origin,
                    status: 'pending'
                }])
                .select()
                .single()

            if (error) throw error

            // Send email notification
            try {
                await fetch('/api/send-shipment-created-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        shipmentId: insertedShipment.id
                    })
                })
            } catch (emailError) {
                console.error('Error sending email notification:', emailError)
                // Don't fail the shipment creation if email fails
            }

            // Reset form
            setNewShipment({
                tracking_number: '',
                user_id: '',
                description: '',
                origin: '',
                destination: '',
                weight: '',
                dimensions: '',
                estimated_delivery: ''
            })
            setShowAddShipment(false)
            fetchAllData()
        } catch (error) {
            console.error('Error adding shipment:', error)
        }
    }

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedShipment || !supabase) return

        setUpdatingStatus(true)
        try {
            const oldStatus = selectedShipment.status

            // Update shipment status
            const { error: shipmentError } = await supabase
                .from('shipments')
                .update({
                    status: statusUpdate.status,
                    current_location: statusUpdate.location,
                    updated_at: new Date().toISOString()
                })
                .eq('id', selectedShipment.id)

            if (shipmentError) throw shipmentError

            // Add tracking event
            const { error: eventError } = await supabase
                .from('tracking_events')
                .insert([{
                    shipment_id: selectedShipment.id,
                    status: statusUpdate.status,
                    location: statusUpdate.location,
                    description: statusUpdate.description,
                    timestamp: new Date().toISOString()
                }])

            if (eventError) throw eventError

            // Send email notification
            try {
                await fetch('/api/send-status-update-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        shipmentId: selectedShipment.id,
                        oldStatus,
                        newStatus: statusUpdate.status,
                        location: statusUpdate.location,
                        description: statusUpdate.description
                    })
                })
            } catch (emailError) {
                console.error('Error sending email notification:', emailError)
                // Don't fail the status update if email fails
            }

            // Reset form
            setStatusUpdate({
                status: '',
                location: '',
                description: ''
            })
            setShowUpdateStatus(false)
            fetchAllData()
            if (selectedShipment) {
                fetchTrackingEvents(selectedShipment.id)
            }
        } catch (error) {
            console.error('Error updating status:', error)
        } finally {
            setUpdatingStatus(false)
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        await fetchAllData()
        setRefreshing(false)
    }

    const toggleEventExpansion = (eventId: number) => {
        setExpandedEvents(prev => {
            const newSet = new Set(prev)
            if (newSet.has(eventId)) {
                newSet.delete(eventId)
            } else {
                newSet.add(eventId)
            }
            return newSet
        })
    }

    const toggleShipmentExpansion = (shipmentId: string) => {
        setExpandedShipments(prev => {
            const newSet = new Set(prev)
            if (newSet.has(shipmentId)) {
                newSet.delete(shipmentId)
            } else {
                newSet.add(shipmentId)
            }
            return newSet
        })
    }

    const handleSignOut = async () => {
        await signOut()
        router.push('/auth')
    }

    // Support functions
    const fetchSupportMessages = async () => {
        try {
            const response = await fetch('/api/support-messages')
            const data = await response.json()
            if (data.supportMessages) {
                setSupportMessages(data.supportMessages)
            }
        } catch (error) {
            console.error('Error fetching support messages:', error)
        }
    }

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSupportMessage || !replyMessage.trim()) return

        setSubmittingReply(true)
        try {
            const response = await fetch('/api/support-replies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    support_message_id: selectedSupportMessage.id,
                    message: replyMessage
                })
            })

            if (response.ok) {
                setReplyMessage('')
                setShowReplyForm(false)
                fetchSupportMessages()
            }
        } catch (error) {
            console.error('Error submitting reply:', error)
        } finally {
            setSubmittingReply(false)
        }
    }

    const updateSupportMessageStatus = async (messageId: string, status: string, priority?: string) => {
        try {
            const response = await fetch(`/api/support-messages/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status, priority })
            })

            if (response.ok) {
                fetchSupportMessages()
            }
        } catch (error) {
            console.error('Error updating support message:', error)
        }
    }

    const filteredShipments = shipments.filter(shipment => {
        const matchesSearch = shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (shipment.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusStats = () => {
        return {
            total: shipments.length,
            inTransit: shipments.filter(s => s.status === 'in_transit').length,
            delivered: shipments.filter(s => s.status === 'delivered').length,
            pending: shipments.filter(s => s.status === 'pending').length,
            exception: shipments.filter(s => s.status === 'exception').length
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-400" />
            case 'in_transit':
                return <Plane className="w-5 h-5 text-blue-400" />
            case 'out_for_delivery':
                return <Truck className="w-5 h-5 text-orange-400" />
            case 'exception':
                return <AlertCircle className="w-5 h-5 text-red-400" />
            case 'departed':
                return <PlaneTakeoff className="w-5 h-5 text-cyan-400" />
            case 'arrived':
                return <PlaneLanding className="w-5 h-5 text-purple-400" />
            case 'processing':
                return <Package className="w-5 h-5 text-yellow-400" />
            default:
                return <Clock className="w-5 h-5 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-900/20 border-green-500/50'
            case 'in_transit':
                return 'bg-blue-900/20 border-blue-500/50'
            case 'out_for_delivery':
                return 'bg-orange-900/20 border-orange-500/50'
            case 'exception':
                return 'bg-red-900/20 border-red-500/50'
            case 'departed':
                return 'bg-cyan-900/20 border-cyan-500/50'
            case 'arrived':
                return 'bg-purple-900/20 border-purple-500/50'
            case 'processing':
                return 'bg-yellow-900/20 border-yellow-500/50'
            default:
                return 'bg-gray-900/20 border-gray-500/50'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Please log in to access admin panel</div>
            </div>
        )
    }

    if (!supabase) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-xl mb-4">Supabase not configured</div>
                    <div className="text-gray-300 mb-4">Please set up your Supabase credentials in .env.local</div>
                    <div className="text-sm text-gray-500">
                        <p>Required variables:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>NEXT_PUBLIC_SUPABASE_URL</li>
                            <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                            <li>SUPABASE_SERVICE_ROLE_KEY</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Access denied. Admin privileges required.</div>
            </div>
        )
    }

    const stats = getStatusStats()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Header */}
            <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white font-serif">QuickVessel</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <a
                                href="/app"
                                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                User View
                            </a>
                            <div className="hidden md:block text-right">
                                <p className="text-sm text-gray-400">Admin</p>
                                <p className="text-white font-medium">{user.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white font-serif mb-2">Admin Dashboard</h2>
                    <p className="text-gray-300">Monitor and manage all shipments and users</p>
                </div>



                {/* Action Buttons */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setShowAddShipment(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Shipment
                        </button>
                        <button
                            onClick={() => setShowUsers(!showUsers)}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-colors"
                        >
                            {showUsers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showUsers ? 'Hide Users' : 'Show Users'}
                        </button>
                        <button
                            onClick={() => {
                                setShowSupport(!showSupport)
                                if (!showSupport) {
                                    fetchSupportMessages()
                                }
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center transition-colors"
                        >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {showSupport ? 'Hide Support' : 'Support Messages'}
                        </button>
                    </div>
                </div>

                {/* Users Section - Simplified */}
                {showUsers && (
                    <div className="mb-6">
                        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                            <h3 className="text-lg font-semibold text-white mb-3">Registered Users ({users.length})</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {users.map((user) => (
                                    <div key={user.id} className="bg-slate-700/30 rounded-lg p-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                                <Users className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{user.email}</p>
                                                <p className="text-xs text-gray-400">
                                                    {user.role === 'admin' ? 'Admin' : 'User'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Support Messages Section */}
                {showSupport && (
                    <div className="mb-6">
                        <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center">
                                    <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
                                    Support Messages ({supportMessages.length})
                                </h3>
                                <button
                                    onClick={fetchSupportMessages}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>

                            {supportMessages.length === 0 ? (
                                <div className="text-center py-8">
                                    <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400">No support messages yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {supportMessages.map((message) => (
                                        <div key={message.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h4 className="text-white font-medium">{message.subject}</h4>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${message.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                                                message.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                                    message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                        'bg-green-100 text-green-800'
                                                            }`}>
                                                            {message.priority.toUpperCase()}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${message.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                                                                message.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                                    message.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                                        'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {message.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                                        <span>From: {message.users?.email}</span>
                                                        <span>{new Date(message.created_at).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 ml-4">
                                                    <select
                                                        value={message.status}
                                                        onChange={(e) => updateSupportMessageStatus(message.id, e.target.value)}
                                                        className="px-2 py-1 bg-slate-600 text-white text-xs rounded border border-slate-500"
                                                    >
                                                        <option value="open">Open</option>
                                                        <option value="in_progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                        <option value="closed">Closed</option>
                                                    </select>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSupportMessage(message)
                                                            setShowReplyForm(true)
                                                        }}
                                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Replies */}
                                            {message.replies && message.replies.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-slate-600/30">
                                                    <h5 className="text-sm font-medium text-gray-400 mb-2">Replies ({message.replies.length})</h5>
                                                    <div className="space-y-2">
                                                        {message.replies.map((reply) => (
                                                            <div key={reply.id} className={`p-3 rounded ${reply.is_admin_reply
                                                                    ? 'bg-blue-900/20 border border-blue-500/30'
                                                                    : 'bg-slate-600/20 border border-slate-500/30'
                                                                }`}>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <span className={`text-xs font-medium ${reply.is_admin_reply ? 'text-blue-400' : 'text-gray-400'
                                                                        }`}>
                                                                        {reply.is_admin_reply ? 'Admin' : 'User'}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {new Date(reply.created_at).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-300">{reply.message}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="max-w-4xl mx-auto">
                    {/* Shipments List */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white font-serif">Shipments</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">
                                    {filteredShipments.length} of {shipments.length}
                                </span>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="mb-6 flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by tracking number, description, or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-3 bg-slate-800/50 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_transit">In Transit</option>
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="delivered">Delivered</option>
                                <option value="exception">Exception</option>
                            </select>
                        </div>

                        {loadingData ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-gray-300 flex items-center space-x-2">
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Loading shipments...</span>
                                </div>
                            </div>
                        ) : filteredShipments.length === 0 ? (
                            <div className="text-center py-12">
                                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">No shipments found</h3>
                                <p className="text-gray-400">
                                    {searchTerm || statusFilter !== 'all'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'No shipments have been created yet'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredShipments.map((shipment) => {
                                    const isExpanded = expandedShipments.has(shipment.id)
                                    return (
                                        <div key={shipment.id} className="border border-slate-700 rounded-lg overflow-hidden">
                                            {/* Shipment Header */}
                                            <button
                                                onClick={() => toggleShipmentExpansion(shipment.id)}
                                                className="w-full p-4 text-left hover:bg-slate-700/50 transition-colors flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0">
                                                        {getStatusIcon(shipment.status)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="text-sm font-mono text-blue-400">
                                                                {shipment.tracking_number}
                                                            </span>
                                                            <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(shipment.status)}`}>
                                                                {shipment.status.replace('_', ' ').toUpperCase()}
                                                            </div>
                                                        </div>
                                                        <p className="text-white text-sm truncate">
                                                            {shipment.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {/* Shipment Details */}
                                            {isExpanded && (
                                                <div className="border-t border-slate-700">
                                                    <div className="p-3 bg-slate-800/20">
                                                        {/* Compact Info Row */}
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center space-x-4 text-sm">
                                                                <div className="flex items-center space-x-1 text-gray-300">
                                                                    <MapPin className="w-3 h-3 text-blue-400" />
                                                                    <span>{shipment.current_location}</span>
                                                                </div>
                                                                <div className="text-gray-400">
                                                                    {shipment.origin} → {shipment.destination}
                                                                </div>
                                                                {shipment.estimated_delivery && (
                                                                    <div className="text-blue-400">
                                                                        ETA: {new Date(shipment.estimated_delivery).toLocaleDateString()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    setSelectedShipment(shipment)
                                                                    setShowUpdateStatus(true)
                                                                }}
                                                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                                                            >
                                                                Update
                                                            </button>
                                                        </div>

                                                        {/* Timeline Section */}
                                                        <div className="border-t border-slate-600 pt-3">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="text-sm font-medium text-white">Timeline</h4>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setSelectedShipment(shipment)
                                                                        fetchTrackingEvents(shipment.id)
                                                                    }}
                                                                    className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
                                                                >
                                                                    Load Events
                                                                </button>
                                                            </div>

                                                            {selectedShipment?.id === shipment.id && trackingEvents.length > 0 ? (
                                                                <div className="space-y-2">
                                                                    {trackingEvents.slice(0, 3).map((event, index) => (
                                                                        <div key={event.id} className="flex items-start space-x-2">
                                                                            <div className={`w-2 h-2 rounded-full mt-1.5 ${index === 0 ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex items-center justify-between">
                                                                                    <span className="text-white text-xs font-medium">
                                                                                        {event.status.replace('_', ' ').toUpperCase()}
                                                                                    </span>
                                                                                    <span className="text-xs text-gray-400">
                                                                                        {new Date(event.timestamp).toLocaleDateString()}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-gray-300 text-xs truncate">{event.description}</p>
                                                                                <div className="flex items-center space-x-1 text-blue-400 text-xs">
                                                                                    <MapPin className="w-2 h-2" />
                                                                                    <span className="truncate">{event.location}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {trackingEvents.length > 3 && (
                                                                        <p className="text-xs text-gray-400 text-center">+{trackingEvents.length - 3} more events</p>
                                                                    )}
                                                                </div>
                                                            ) : selectedShipment?.id === shipment.id ? (
                                                                <p className="text-gray-400 text-xs">No tracking events</p>
                                                            ) : (
                                                                <p className="text-gray-500 text-xs">Click "Load Events" to view timeline</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Shipment Modal */}
            {showAddShipment && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-serif">Create New Shipment</h3>
                                        <p className="text-sm text-gray-400">Add a new shipment for tracking</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAddShipment(false)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAddShipment} className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white flex items-center">
                                    <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
                                    Basic Information
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Tracking Number *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Enter tracking number"
                                            value={newShipment.tracking_number}
                                            onChange={(e) => setNewShipment({ ...newShipment, tracking_number: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Assign to User *
                                        </label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            value={newShipment.user_id}
                                            onChange={(e) => setNewShipment({ ...newShipment, user_id: e.target.value })}
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.full_name ? `${user.full_name} (${user.email})` : user.email}
                                                </option>
                                            ))}
                                        </select>
                                        {users.length === 0 && (
                                            <p className="text-xs text-yellow-400 mt-1">No users found. Please ensure users are registered.</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Description *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter shipment description"
                                        value={newShipment.description}
                                        onChange={(e) => setNewShipment({ ...newShipment, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Route Information */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white flex items-center">
                                    <div className="w-1 h-6 bg-cyan-500 rounded-full mr-3"></div>
                                    Route Information
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Origin *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="e.g., New York, NY"
                                            value={newShipment.origin}
                                            onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Destination *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="e.g., Los Angeles, CA"
                                            value={newShipment.destination}
                                            onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Package Details */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white flex items-center">
                                    <div className="w-1 h-6 bg-purple-500 rounded-full mr-3"></div>
                                    Package Details
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                            value={newShipment.weight}
                                            onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Dimensions
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="e.g., 10x8x6 inches"
                                            value={newShipment.dimensions}
                                            onChange={(e) => setNewShipment({ ...newShipment, dimensions: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Estimated Delivery
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        value={newShipment.estimated_delivery}
                                        onChange={(e) => setNewShipment({ ...newShipment, estimated_delivery: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                                <button
                                    type="button"
                                    onClick={() => setShowAddShipment(false)}
                                    className="flex-1 px-6 py-3 border border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700 rounded-xl font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Create Shipment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Status Modal */}
            {showUpdateStatus && selectedShipment && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-lg">
                        {/* Header */}
                        <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-serif">Update Shipment Status</h3>
                                        <p className="text-sm text-gray-400">Tracking: {selectedShipment.tracking_number}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowUpdateStatus(false)
                                        setStatusUpdate({ status: '', location: '', description: '' })
                                    }}
                                    disabled={updatingStatus}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpdateStatus} className="p-6 space-y-6">
                            {/* Current Status Display */}
                            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400">Current Status</p>
                                        <p className="text-lg font-semibold text-white">
                                            {selectedShipment.status.replace('_', ' ').toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Location</p>
                                        <p className="text-sm text-white">{selectedShipment.current_location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Update Form */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white flex items-center">
                                    <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                                    Update Information
                                </h4>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        New Status *
                                    </label>
                                    <select
                                        required
                                        disabled={updatingStatus}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        value={statusUpdate.status}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                                    >
                                        <option value="">Select new status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_transit">In Transit</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="exception">Exception</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Current Location *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={updatingStatus}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Enter current location"
                                        value={statusUpdate.location}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, location: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Update Description *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        disabled={updatingStatus}
                                        className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                        placeholder="Describe the status update..."
                                        value={statusUpdate.description}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Status Preview */}
                            {statusUpdate.status && (
                                <div className="bg-green-900/20 border border-green-500/50 rounded-xl p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <div>
                                            <p className="text-sm text-green-300">Status will change to:</p>
                                            <p className="text-lg font-semibold text-green-400">
                                                {statusUpdate.status.replace('_', ' ').toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUpdateStatus(false)
                                        setStatusUpdate({ status: '', location: '', description: '' })
                                    }}
                                    disabled={updatingStatus}
                                    className="flex-1 px-6 py-3 border border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updatingStatus}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {updatingStatus ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Status'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reply Form Modal */}
            {showReplyForm && selectedSupportMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 w-full max-w-2xl">
                        <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Send className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white font-serif">Reply to Support Message</h3>
                                        <p className="text-sm text-gray-400">Subject: {selectedSupportMessage.subject}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowReplyForm(false)
                                        setSelectedSupportMessage(null)
                                        setReplyMessage('')
                                    }}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleReplySubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Your Reply *
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    disabled={submittingReply}
                                    className="w-full px-4 py-3 border border-slate-600 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                    placeholder="Type your reply here..."
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                />
                            </div>

                            <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowReplyForm(false)
                                        setSelectedSupportMessage(null)
                                        setReplyMessage('')
                                    }}
                                    disabled={submittingReply}
                                    className="flex-1 px-6 py-3 border border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingReply}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {submittingReply ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reply'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
