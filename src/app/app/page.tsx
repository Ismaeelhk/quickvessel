'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createBrowserClient } from '@supabase/ssr'
import { Shipment, TrackingEvent } from '@/lib/supabase'
import { testDatabaseConnection, testTablesExist } from '@/lib/test-db'
import { Package, MapPin, Clock, CheckCircle, AlertCircle, Truck, Plane, PlaneTakeoff, PlaneLanding, TrendingUp, Activity, BarChart3, Search, Filter, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MessageCircle } from 'lucide-react'

export default function AppPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const [shipments, setShipments] = useState<Shipment[]>([])
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
    const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([])
    const [loadingShipments, setLoadingShipments] = useState(true)
    const [dbError, setDbError] = useState<string | null>(null)
    const [dbTestResults, setDbTestResults] = useState<any>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [refreshing, setRefreshing] = useState(false)
    const [supportUnread, setSupportUnread] = useState<number>(0)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url_here'
        ? createBrowserClient(supabaseUrl, supabaseAnonKey)
        : null

    useEffect(() => {
        if (loading) return

        if (!user) {
            console.log('No user found, redirecting to auth')
            router.push('/auth')
            return
        }

        if (user && supabase) {
            // fetch unread support replies
            fetch('/api/support-unread')
                .then(res => res.json())
                .then(data => setSupportUnread(data.unread || 0))
                .catch(() => setSupportUnread(0))
            // Test database connection first
            testDatabaseConnection().then(result => {
                console.log('Database connection test result:', result)
                setDbTestResults(result)
                if (!result.success) {
                    setDbError('Database connection failed: ' + JSON.stringify(result.error))
                }
            })

            testTablesExist().then(results => {
                console.log('Tables exist test results:', results)
                setDbTestResults((prev: any) => ({ ...prev, tables: results }))
            })

            fetchShipments()
        } else if (user && !supabase) {
            setDbError('Supabase not configured. Please set up your environment variables.')
            setLoadingShipments(false)
        }
    }, [user, loading, supabase, router])

    const fetchShipments = async () => {
        if (!supabase) {
            setDbError('Supabase not configured')
            setLoadingShipments(false)
            return
        }

        try {
            console.log('Fetching shipments for user:', user?.id)
            console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

            const { data, error } = await supabase
                .from('shipments')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false })

            console.log('Supabase response:', { data, error })

            if (error) throw error
            setShipments(data || [])
        } catch (error) {
            console.error('Error fetching shipments:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            setDbError('Error fetching shipments: ' + JSON.stringify(error, null, 2))
        } finally {
            setLoadingShipments(false)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        router.push('/auth')
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

    const handleShipmentSelect = (shipment: Shipment) => {
        setSelectedShipment(shipment)
        fetchTrackingEvents(shipment.id)
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        await fetchShipments()
        setRefreshing(false)
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
                <div className="text-white text-xl">Please log in to view your shipments</div>
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
                            <h1 className="text-2xl font-bold text-white font-serif">QuickVessel</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/support"
                                className="relative text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors inline-flex items-center"
                                onClick={() => {
                                    // mark as seen
                                    fetch('/api/support-unread', { method: 'POST' }).then(() => setSupportUnread(0))
                                }}
                            >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Support
                                {supportUnread > 0 && (
                                    <span className="ml-2 inline-flex items-center justify-center text-[10px] font-semibold rounded-full bg-red-600 text-white w-5 h-5">
                                        {supportUnread > 9 ? '9+' : supportUnread}
                                    </span>
                                )}
                            </a>
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="p-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <div className="hidden md:block text-right">
                                <p className="text-sm text-gray-400">Welcome back</p>
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
                    <h2 className="text-3xl font-bold text-white font-serif mb-2">Dashboard</h2>
                    <p className="text-gray-300">Track and manage your shipments in real-time</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1">Total Shipments</p>
                                <p className="text-3xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1">In Transit</p>
                                <p className="text-3xl font-bold text-white">{stats.inTransit}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1">Delivered</p>
                                <p className="text-3xl font-bold text-white">{stats.delivered}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-white">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Debug Panel - Only show if there are errors */}


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipments List */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white font-serif">Your Shipments</h2>
                            <div className="text-sm text-gray-400">
                                {filteredShipments.length} of {shipments.length}
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="mb-6 space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search shipments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_transit">In Transit</option>
                                    <option value="out_for_delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="exception">Exception</option>
                                </select>
                            </div>
                        </div>

                        {loadingShipments ? (
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
                                        : 'You don\'t have any shipments yet'
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredShipments.map((shipment) => (
                                    <div
                                        key={shipment.id}
                                        onClick={() => handleShipmentSelect(shipment)}
                                        className={`p-5 rounded-xl border cursor-pointer transition-all hover:border-blue-400/50 hover:shadow-lg group ${selectedShipment?.id === shipment.id
                                            ? 'border-blue-400 bg-blue-900/20 shadow-lg'
                                            : 'border-slate-700/50 bg-slate-800/50 backdrop-blur-sm'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-sm font-mono text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                                                        {shipment.tracking_number}
                                                    </span>
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                                                        {shipment.status.replace('_', ' ').toUpperCase()}
                                                    </div>
                                                </div>
                                                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                                                    {shipment.description}
                                                </h3>
                                                <div className="flex items-center text-sm text-gray-400 mb-3">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    <span>{shipment.origin} → {shipment.destination}</span>
                                                </div>
                                            </div>
                                            <div className="ml-3 flex-shrink-0">
                                                {getStatusIcon(shipment.status)}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>Created {new Date(shipment.created_at).toLocaleDateString()}</span>
                                            {shipment.estimated_delivery && (
                                                <span>ETA: {new Date(shipment.estimated_delivery).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tracking Details */}
                    <div className="lg:col-span-2">
                        {selectedShipment ? (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white font-serif">Tracking Details</h2>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Activity className="w-4 h-4" />
                                        <span>Live tracking</span>
                                    </div>
                                </div>

                                {/* Shipment Info */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-700/50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Shipment Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Tracking Number:</span>
                                                    <span className="text-white font-mono">{selectedShipment.tracking_number}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Status:</span>
                                                    <span className="text-white">{selectedShipment.status.replace('_', ' ').toUpperCase()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Current Location:</span>
                                                    <span className="text-white">{selectedShipment.current_location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Destination:</span>
                                                    <span className="text-white">{selectedShipment.destination}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-2">Delivery Information</h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Origin:</span>
                                                    <span className="text-white">{selectedShipment.origin}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Estimated Delivery:</span>
                                                    <span className="text-white">
                                                        {selectedShipment.estimated_delivery
                                                            ? new Date(selectedShipment.estimated_delivery).toLocaleDateString()
                                                            : 'TBD'
                                                        }
                                                    </span>
                                                </div>
                                                {selectedShipment.weight && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Weight:</span>
                                                        <span className="text-white">{selectedShipment.weight} kg</span>
                                                    </div>
                                                )}
                                                {selectedShipment.dimensions && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Dimensions:</span>
                                                        <span className="text-white">{selectedShipment.dimensions}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Timeline */}
                                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-white">Tracking History</h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                            <BarChart3 className="w-4 h-4" />
                                            <span>{trackingEvents.length} events</span>
                                        </div>
                                    </div>
                                    {trackingEvents.length === 0 ? (
                                        <div className="text-gray-400">No tracking events available</div>
                                    ) : (
                                        <div className="space-y-4">
                                            {trackingEvents.map((event, index) => {
                                                const getEventIcon = (status: string) => {
                                                    switch (status) {
                                                        case 'delivered':
                                                            return <CheckCircle className="w-4 h-4 text-green-400" />
                                                        case 'in_transit':
                                                            return <Plane className="w-4 h-4 text-blue-400" />
                                                        case 'out_for_delivery':
                                                            return <Truck className="w-4 h-4 text-orange-400" />
                                                        case 'departed':
                                                            return <PlaneTakeoff className="w-4 h-4 text-cyan-400" />
                                                        case 'arrived':
                                                            return <PlaneLanding className="w-4 h-4 text-purple-400" />
                                                        case 'processing':
                                                            return <Package className="w-4 h-4 text-yellow-400" />
                                                        case 'exception':
                                                            return <AlertCircle className="w-4 h-4 text-red-400" />
                                                        default:
                                                            return <Clock className="w-4 h-4 text-gray-400" />
                                                    }
                                                }

                                                return (
                                                    <div key={event.id} className="flex items-start space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-900/30 border-2 border-blue-400' : 'bg-slate-700 border border-slate-600'
                                                                }`}>
                                                                {getEventIcon(event.status)}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-white font-medium">{event.status.replace('_', ' ').toUpperCase()}</p>
                                                                <p className="text-sm text-gray-400">
                                                                    {new Date(event.timestamp).toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <p className="text-gray-300 text-sm mt-1">{event.description}</p>
                                                            <p className="text-blue-400 text-sm mt-1 flex items-center">
                                                                <MapPin className="w-4 h-4 mr-1" />
                                                                {event.location}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Select a Shipment</h3>
                                <p className="text-gray-400 mb-6">Choose a shipment from the list to view detailed tracking information</p>
                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Plane className="w-4 h-4" />
                                        <span>Real-time tracking</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Location updates</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Activity className="w-4 h-4" />
                                        <span>Status history</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
