import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { PlusCircle, Edit, Trash2, Eye, Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);

  // Mock data for demonstration
  const mockEvents = [
    {
      _id: '1',
      title: 'Mental Health First Aid Training',
      description: 'Comprehensive training program for mental health first aid certification',
      date: '2024-02-15',
      time: '09:00',
      location: 'Community Center, Downtown',
      maxAttendees: 25,
      currentAttendees: 18,
      status: 'published',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      title: 'Workplace Wellness Workshop',
      description: 'Interactive workshop on creating healthy workplace environments',
      date: '2024-02-20',
      time: '14:00',
      location: 'Corporate Office, Business District',
      maxAttendees: 50,
      currentAttendees: 32,
      status: 'published',
      createdAt: '2024-01-20T14:30:00Z'
    },
    {
      _id: '3',
      title: 'Stress Management Seminar',
      description: 'Learn effective techniques for managing stress in daily life',
      date: '2024-02-25',
      time: '10:00',
      location: 'Online Event',
      maxAttendees: 100,
      currentAttendees: 67,
      status: 'scheduled',
      createdAt: '2024-01-25T09:15:00Z'
    },
    {
      _id: '4',
      title: 'Youth Mental Health Awareness',
      description: 'Educational event focused on youth mental health challenges',
      date: '2024-03-01',
      time: '16:00',
      location: 'High School Auditorium',
      maxAttendees: 200,
      currentAttendees: 0,
      status: 'draft',
      createdAt: '2024-01-30T11:45:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents(mockEvents);
      } catch (err) {
        setError('Failed to fetch events.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setEvents(events.filter(e => e._id !== eventId));
      } catch (err) {
        setError('Failed to delete event.');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      setEvents(events.map(e => e._id === eventId ? { ...e, status: newStatus } : e));
    } catch (err) {
      setError('Failed to update event status.');
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      published: { color: 'bg-green-100 text-green-800', label: 'Published' },
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredEvents = events.filter(event => {
    const statusMatch = filterStatus === 'all' || event.status === filterStatus;
    return statusMatch;
  });

  // Pagination logic
  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  if (loading) return <div className="p-8">Loading events...</div>;
  if (error) return (
    <div className="text-red-500 p-8">
      {error}
      <button onClick={() => window.location.reload()} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded">Retry</button>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Event Management</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Manage all events, workshops, and training sessions
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/admin/events/new"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Event
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-6">
              <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-white">Total Events</h3>
              <p className="text-xl md:text-3xl font-bold text-blue-600">{events.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-6">
              <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-white">Published</h3>
              <p className="text-xl md:text-3xl font-bold text-green-600">{events.filter(e => e.status === 'published').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-6">
              <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-white">Scheduled</h3>
              <p className="text-xl md:text-3xl font-bold text-indigo-600">{events.filter(e => e.status === 'scheduled').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 md:p-6">
              <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-white">Drafts</h3>
              <p className="text-xl md:text-3xl font-bold text-gray-600">{events.filter(e => e.status === 'draft').length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedEvents.map(event => (
                  <tr key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{event.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">{new Date(event.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900 dark:text-white">{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {event.currentAttendees}/{event.maxAttendees}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={event.status}
                        onChange={(e) => handleStatusChange(event._id, e.target.value)}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <Link 
                        to={`/events/${event._id}`} 
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                      >
                        <Eye className="h-5 w-5 inline" />
                      </Link>
                      <Link 
                        to={`/admin/events/edit/${event._id}`} 
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1"
                      >
                        <Edit className="h-5 w-5 inline" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(event._id)} 
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1"
                      >
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {paginatedEvents.map(event => (
              <div key={event._id} className="border-b border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {event.description}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Users className="h-3 w-3 mr-1" />
                    {event.currentAttendees}/{event.maxAttendees} attendees
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <select
                    value={event.status}
                    onChange={(e) => handleStatusChange(event._id, e.target.value)}
                    className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center justify-between space-x-3">
                  <div className="flex space-x-3">
                    <Link 
                      to={`/events/${event._id}`} 
                      target="_blank"
                      className="flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium p-2"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <Link 
                      to={`/admin/events/edit/${event._id}`} 
                      className="flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium p-2"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </div>
                  <button 
                    onClick={() => handleDelete(event._id)} 
                    className="flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium p-2"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing{" "}
                  <span className="font-medium">{startIndex + 1}</span>
                  {" "}to{" "}
                  <span className="font-medium">{Math.min(endIndex, totalEvents)}</span>
                  {" "}of{" "}
                  <span className="font-medium">{totalEvents}</span>
                  {" "}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-200"
                          : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {totalEvents === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;
