import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('[data-dropdown]')) {
                setActiveDropdown(null);
                setIsDropdownHovered(false);
            }
        };

        if (activeDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    const navItems = [
        {
            label: 'Services',
            path: '/services',
            dropdown: [
                {
                    label: 'Business Consulting',
                    path: '/services/business-consulting',
                    image: '/Milestones of business projects-cuate.png',
                    description: 'Strategic guidance and expert advice to help your business grow, optimize operations, and achieve sustainable success.'
                },
                {
                    label: 'Training Programs',
                    path: '/training-programs',
                    image: '/Milestones of business projects-cuate.png',
                    description: 'Comprehensive skill development programs designed to enhance your team\'s capabilities and drive organizational excellence.'
                },
                {
                    label: 'Mentoring & Coaching',
                    path: '/services/mentoring-coaching',
                    image: '/Milestones of business projects-cuate.png',
                    description: 'Personalized one-on-one mentoring and coaching sessions to unlock your potential and accelerate professional growth.'
                },
                {
                    label: 'Counselling',
                    path: '/services/counselling',
                    image: '/Milestones of business projects-cuate.png',
                    description: 'Professional counselling services to support mental health, work-life balance, and personal development.'
                }
            ]
        },
        { label: 'Blog', path: '/blog' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' }
    ];

    return (
        <>
            {/* Backdrop */}
            {activeDropdown && (
                <div
                    className="fixed inset-0 bg-black/10 z-[1000] pointer-events-none transition-opacity duration-200"
                    style={{ opacity: activeDropdown ? 1 : 0 }}
                />
            )}

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-[1001] w-full bg-white/95 backdrop-blur-xl shadow-lg border-b border-white/20 transition-all duration-300">
                <nav className="flex justify-between items-center h-[70px] px-8 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 text-yellow-500 no-underline">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg flex items-center justify-center text-black font-bold text-xl">
                            I
                        </div>
                        <span className="text-3xl font-bold">Invictus Solutions</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-9">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <div
                                        data-dropdown
                                        className="relative"
                                        onMouseEnter={() => {
                                            setActiveDropdown(item.label);
                                            setIsDropdownHovered(true);
                                        }}
                                        onMouseLeave={() => {
                                            setActiveDropdown(null);
                                            setIsDropdownHovered(false);
                                        }}
                                    >
                                        <Link
                                            to={item.path}
                                            className={`
                        text-gray-800 no-underline font-semibold text-sm whitespace-nowrap 
                        px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-300
                        hover:text-yellow-500 hover:bg-yellow-500/10
                        ${location.pathname.startsWith(item.path) ? 'text-yellow-500 bg-yellow-500/15' : ''}
                      `}
                                        >
                                            {item.label}
                                            <span
                                                className={`text-xs transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : 'rotate-0'}`}
                                            >
                                                ▼
                                            </span>
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === item.label && (
                                            <div
                                                className="absolute top-[calc(100%+10px)] left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-5 w-[70vw] max-w-[840px] z-[1002] animate-in fade-in slide-in-from-top-2 duration-200"
                                                onMouseEnter={() => setIsDropdownHovered(true)}
                                                onMouseLeave={() => setIsDropdownHovered(false)}
                                            >
                                                <ul className="list-none m-0 p-0 flex flex-wrap gap-5 justify-between">
                                                    {item.dropdown.map((dropdownItem) => (
                                                        <li key={dropdownItem.label} className="flex-1 min-w-[200px] max-w-[300px]">
                                                            <Link
                                                                to={dropdownItem.path}
                                                                className="flex items-start p-6 text-gray-800 no-underline font-medium text-base transition-all duration-300 rounded-2xl bg-white/90 border border-black/5 gap-5 min-h-[120px] hover:bg-yellow-500/15 hover:text-yellow-500 hover:-translate-y-1 hover:shadow-xl"
                                                            >
                                                                <div className="flex-1 flex flex-col gap-2">
                                                                    <h3 className="m-0 text-lg font-semibold text-gray-800 leading-tight">
                                                                        {dropdownItem.label}
                                                                    </h3>
                                                                    <p className="m-0 text-sm text-gray-600 leading-relaxed flex-1">
                                                                        {dropdownItem.description}
                                                                    </p>
                                                                </div>
                                                                <img
                                                                    src={dropdownItem.image}
                                                                    alt={dropdownItem.label}
                                                                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border-2 border-yellow-500/20"
                                                                    onError={(e) => {
                                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik00MCA0MEM0OC4yODQzIDQwIDU1IDMzLjI4NDMgNTUgMjVDNTUgMTYuNzE1NyA0OC4yODQzIDEwIDQwIDEwQzMxLjcxNTcgMTAgMjUgMTYuNzE1NyAyNSAyNUMyNSAzMy4yODQzIDMxLjcxNTcgNDAgNDAgNDBaIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik00MCAzMkM0NC40MTg2IDMyIDQ4IDI4LjQxODYgNDggMjRDNDggMTkuNTgxNCA0NC40MTg2IDE2IDQwIDE2QzM1LjU4MTQgMTYgMzIgMTkuNTgxNCAzMiAyNEMzMiAyOC40MTg2IDM1LjU4MTQgMzIgNDAgMzJaIiBmaWxsPSIjOTk5OTk5Ii8+Cjwvc3ZnPgo=';
                                                                    }}
                                                                />
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`
                      text-gray-800 no-underline font-semibold text-sm whitespace-nowrap 
                      px-4 py-2 rounded-lg flex items-center gap-1 transition-all duration-300
                      hover:text-yellow-500 hover:bg-yellow-500/10
                      ${location.pathname === item.path ? 'text-yellow-500 bg-yellow-500/15' : ''}
                    `}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            to="/book-consultation"
                            className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-black px-6 py-3 rounded-xl no-underline font-semibold text-sm whitespace-nowrap shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-500/40"
                        >
                            Book a Consult
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden bg-transparent border-none text-2xl text-gray-800 cursor-pointer"
                    >
                        ☰
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="fixed top-20 left-0 right-0 bg-white border-t border-gray-200 p-5 z-[999] animate-in fade-in slide-in-from-top duration-300"
                    >
                        {navItems.map((item) => (
                            <div key={item.label}>
                                <Link
                                    to={item.path}
                                    className="block py-4 text-gray-800 no-underline font-medium border-b border-gray-100 hover:text-yellow-500 transition-colors"
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <div className="pl-5">
                                        {item.dropdown.map((dropdownItem) => (
                                            <Link
                                                key={dropdownItem.label}
                                                to={dropdownItem.path}
                                                className="block py-4 text-gray-800 no-underline font-medium border-b border-gray-100 hover:text-yellow-500 transition-colors"
                                            >
                                                {dropdownItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="mt-5">
                            <Link
                                to="/book-consultation"
                                className="inline-block bg-gradient-to-br from-yellow-500 to-yellow-700 text-black px-6 py-3 rounded-xl no-underline font-semibold text-sm shadow-lg shadow-yellow-500/30"
                            >
                                Book a Consult
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};