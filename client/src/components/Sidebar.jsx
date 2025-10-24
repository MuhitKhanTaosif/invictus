import React from "react";
import { Link, useLocation } from "react-router";
import { LayoutDashboard, FileText, Calendar } from "lucide-react";

export default function Sidebar() {
    const location = useLocation();
    
    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/admin-invictus/application-state',
            icon: LayoutDashboard,
        },
        {
            name: 'Blogs',
            href: '/admin-invictus/blogs',
            icon: FileText,
        },
        {
            name: 'Events',
            href: '/admin-invictus/events',
            icon: Calendar,
        },
    ];

    return (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
            <div className="flex flex-col h-full">
                {/* Logo/Brand */}
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Admin Panel
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                            >
                                <Icon 
                                    className={`mr-3 h-5 w-5 ${
                                        isActive 
                                            ? 'text-primary-600 dark:text-primary-400' 
                                            : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                    }`} 
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Invictus Admin Dashboard
                    </div>
                </div>
            </div>
        </div>
    );
}