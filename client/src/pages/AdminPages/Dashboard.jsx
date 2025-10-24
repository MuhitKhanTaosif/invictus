import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { 
  FileText, 
  Eye, 
  Heart, 
  Share2, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  BarChart3,
  Activity
} from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('30d');

    useEffect(() => {
        fetchDashboardStats();
    }, [selectedPeriod]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/admin/dashboard-stats?period=${selectedPeriod}`);
            setStats(response.data);
        } catch (err) {
            setError('Failed to fetch dashboard statistics');
            console.error('Dashboard stats error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const getGrowthIcon = (growth) => {
        if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
        if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
        return <Activity className="h-4 w-4 text-gray-500" />;
    };

    const getGrowthColor = (growth) => {
        if (growth > 0) return 'text-green-600';
        if (growth < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-calm flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <Activity className="h-12 w-12 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">Error Loading Dashboard</h2>
                    <p className="text-neutral-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchDashboardStats}
                        className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-calm">
            <div className="max-w-7xl mx-auto px-5 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4 font-heading">
                        Admin
                        <span className="block text-primary-600">Dashboard</span>
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-6">
                        Monitor and manage your application from this comprehensive admin dashboard.
                    </p>
                    
                    {/* Period Selector */}
                    <div className="flex justify-center space-x-2">
                        {['7d', '30d', '90d', '1y'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    selectedPeriod === period
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                                }`}
                            >
                                {period === '7d' ? '7 Days' : 
                                 period === '30d' ? '30 Days' :
                                 period === '90d' ? '90 Days' : '1 Year'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Blog Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary-100 rounded-xl">
                                <FileText className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="flex items-center space-x-1">
                                {getGrowthIcon(stats?.trends?.blogsGrowth)}
                                <span className={`text-sm font-medium ${getGrowthColor(stats?.trends?.blogsGrowth)}`}>
                                    {stats?.trends?.blogsGrowth > 0 ? '+' : ''}{stats?.trends?.blogsGrowth || 0}%
                                </span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                            {formatNumber(stats?.overview?.totalBlogs || 0)}
                        </h3>
                        <p className="text-neutral-600 text-sm">Total Blogs</p>
                        <div className="mt-2 text-xs text-neutral-500">
                            {stats?.overview?.publishedBlogs || 0} published
                        </div>
                    </motion.div>

                    {/* Page Views */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent-100 rounded-xl">
                                <Eye className="h-6 w-6 text-accent-600" />
                            </div>
                            <div className="flex items-center space-x-1">
                                {getGrowthIcon(stats?.trends?.pageViewsGrowth)}
                                <span className={`text-sm font-medium ${getGrowthColor(stats?.trends?.pageViewsGrowth)}`}>
                                    {stats?.trends?.pageViewsGrowth > 0 ? '+' : ''}{stats?.trends?.pageViewsGrowth || 0}%
                                </span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                            {formatNumber(stats?.overview?.totalPageViews || 0)}
                        </h3>
                        <p className="text-neutral-600 text-sm">Page Views</p>
                        <div className="mt-2 text-xs text-neutral-500">
                            {formatNumber(stats?.overview?.totalBlogViews || 0)} blog views
                        </div>
                    </motion.div>

                    {/* Unique Visitors */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-sage-100 rounded-xl">
                                <Users className="h-6 w-6 text-sage-600" />
                            </div>
                            <div className="flex items-center space-x-1">
                                {getGrowthIcon(stats?.trends?.uniqueVisitorsGrowth)}
                                <span className={`text-sm font-medium ${getGrowthColor(stats?.trends?.uniqueVisitorsGrowth)}`}>
                                    {stats?.trends?.uniqueVisitorsGrowth > 0 ? '+' : ''}{stats?.trends?.uniqueVisitorsGrowth || 0}%
                                </span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                            {formatNumber(stats?.overview?.uniqueVisitors || 0)}
                        </h3>
                        <p className="text-neutral-600 text-sm">Unique Visitors</p>
                    </motion.div>

                    {/* Engagement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-warm-100 rounded-xl">
                                <Heart className="h-6 w-6 text-warm-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-800 mb-1">
                            {formatNumber(stats?.blogAnalytics?.totalLikes || 0)}
                        </h3>
                        <p className="text-neutral-600 text-sm">Total Likes</p>
                        <div className="mt-2 text-xs text-neutral-500">
                            {formatNumber(stats?.blogAnalytics?.totalShares || 0)} shares
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Blogs */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-neutral-800">Recent Blogs</h2>
                            <Link 
                                to="/admin-invictus/blogs"
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats?.blogAnalytics?.recentBlogs?.length > 0 ? (
                                stats.blogAnalytics.recentBlogs.map((blog, index) => (
                                    <div key={blog._id} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-800 truncate">
                                                {blog.title}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {blog.author?.name} • {new Date(blog.publishedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2 text-xs text-neutral-500">
                                            <span className="flex items-center">
                                                <Eye className="h-3 w-3 mr-1" />
                                                {blog.views}
                                            </span>
                                            <span className="flex items-center">
                                                <Heart className="h-3 w-3 mr-1" />
                                                {blog.likes}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500 text-center py-4">No recent blogs</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Top Performing Blogs */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-neutral-800">Top Blogs</h2>
                            <BarChart3 className="h-5 w-5 text-neutral-400" />
                        </div>
                        <div className="space-y-4">
                            {stats?.blogAnalytics?.topBlogs?.length > 0 ? (
                                stats.blogAnalytics.topBlogs.map((blog, index) => (
                                    <div key={blog._id} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-800 truncate">
                                                {blog.title}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {blog.author?.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2 text-xs text-neutral-500">
                                            <span className="flex items-center">
                                                <Eye className="h-3 w-3 mr-1" />
                                                {blog.views}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-neutral-500 text-center py-4">No top blogs</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Device & Traffic Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Device Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <h2 className="text-xl font-bold text-neutral-800 mb-6">Device Stats</h2>
                        <div className="space-y-4">
                            {stats?.trafficAnalytics?.deviceStats?.map((device, index) => (
                                <div key={device._id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {device._id === 'desktop' && <Monitor className="h-4 w-4 text-neutral-500" />}
                                        {device._id === 'mobile' && <Smartphone className="h-4 w-4 text-neutral-500" />}
                                        {device._id === 'tablet' && <Tablet className="h-4 w-4 text-neutral-500" />}
                                        {device._id === 'unknown' && <Globe className="h-4 w-4 text-neutral-500" />}
                                        <span className="text-sm font-medium text-neutral-700 capitalize">
                                            {device._id}
                                        </span>
                                    </div>
                                    <span className="text-sm text-neutral-600">{device.count}</span>
                                </div>
                            )) || (
                                <p className="text-neutral-500 text-center py-4">No device data</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Top Pages */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <h2 className="text-xl font-bold text-neutral-800 mb-6">Top Pages</h2>
                        <div className="space-y-3">
                            {stats?.trafficAnalytics?.topPages?.slice(0, 5).map((page, index) => (
                                <div key={page._id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-medium text-neutral-600">
                                            {index + 1}.
                                        </span>
                                        <span className="text-sm text-neutral-700 truncate max-w-32">
                                            {page._id}
                                        </span>
                                    </div>
                                    <span className="text-sm text-neutral-600">{page.views}</span>
                                </div>
                            )) || (
                                <p className="text-neutral-500 text-center py-4">No page data</p>
                            )}
                        </div>
                    </motion.div>

                    {/* System Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="bg-white rounded-2xl p-6 shadow-soft"
                    >
                        <h2 className="text-xl font-bold text-neutral-800 mb-6">System Status</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-green-600 font-medium text-sm">System</span>
                                <span className="text-green-600 text-sm">✅ Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <span className="text-blue-600 font-medium text-sm">Database</span>
                                <span className="text-blue-600 text-sm">✅ Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <span className="text-purple-600 font-medium text-sm">API</span>
                                <span className="text-purple-600 text-sm">✅ Running</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                <span className="text-neutral-600 font-medium text-sm">Categories</span>
                                <span className="text-neutral-600 text-sm">{stats?.overview?.totalCategories || 0}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


