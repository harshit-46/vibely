import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar({ currentPage = 'home' }) {
    const {user , logout} = useAuth();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    const currentUser = user || {};

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand - Left Side */}
                    <Link to="/feed" className="flex items-center gap-3 group shrink-0">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg">
                            <span className="text-lg font-bold text-white">V</span>
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vibely</span>
                    </Link>

                    {/* Navigation Links - Right Side */}
                    <nav className="flex items-center gap-2">
                        {/* Home */}
                        <Link
                            to="/feed"
                            className={`flex items-center justify-center gap-2 w-27.5 h-10 rounded-lg transition-all duration-200 ${currentPage === 'home'
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <svg
                                className="w-5 h-5 transition-all duration-200"
                                fill={currentPage === 'home' ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
                                />
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Home</span>
                        </Link>

                        {/* Search */}
                        <Link
                            to="/search"
                            className={`flex items-center justify-center gap-2 w-27.5 h-10 rounded-lg transition-all duration-200 ${currentPage === 'search'
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <svg className="w-5 h-5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Search</span>
                        </Link>

                        {/* Create Post - Mobile: Icon only */}
                        <Link
                            to="/createpost"
                            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${currentPage === 'createpost'
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <svg className="w-5 h-5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </Link>

                        {/* Create Post - Desktop: Full Button */}
                        <Link
                            to="/createpost"
                            className="hidden md:flex items-center justify-center gap-2 w-27.5 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 text-sm shadow-lg shadow-blue-600/20"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>New Post</span>
                        </Link>

                        {/* Profile */}
                        <Link
                            to="/profile"
                            className={`flex items-center justify-center gap-2 w-27.5 h-10 rounded-lg transition-all duration-200 ${currentPage === 'profile'
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            {currentUser.profileImage ? (
                                <img
                                    src={currentUser.profileImage}
                                    alt={currentUser.name}
                                    className="w-6 h-6 rounded-full object-cover ring-2 ring-zinc-700"
                                />
                            ) : (
                                <svg
                                    className="w-5 h-5 transition-all duration-200"
                                    fill={currentPage === 'profile' ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                            <span className="hidden lg:inline text-sm font-medium">Profile</span>
                        </Link>

                        {/* Settings Dropdown */}
                        <div className="relative" ref={settingsRef}>
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className="flex items-center justify-center gap-2 w-27.5 h-10 rounded-lg transition-all duration-200 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                            >
                                <svg className="w-5 h-5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="hidden lg:inline text-sm font-medium">Settings</span>
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-2 transition-all duration-200 ${isSettingsOpen
                                        ? 'opacity-100 translate-y-0 visible'
                                        : 'opacity-0 -translate-y-2 invisible'
                                    }`}
                            >
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        {currentUser.profileImage ? (
                                            <img
                                                src={currentUser.profileImage}
                                                alt={currentUser.name}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-700"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                <span className='text-white font-bold text-lg'>{currentUser.username.charAt(0).toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-white truncate">{currentUser.name}</p>
                                            <p className="text-zinc-400 text-xs truncate">@{currentUser.username}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Links */}
                                <div className="py-2">
                                    <Link
                                        to="/settings/account"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Account Settings
                                    </Link>

                                    <Link
                                        to="/settings/privacy"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Privacy & Security
                                    </Link>

                                    <Link
                                        to="/settings/notifications"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        Notifications
                                    </Link>

                                    <Link
                                        to="/settings/appearance"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                        Appearance
                                    </Link>

                                    <Link
                                        to="/settings/blocked"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                        Blocked users
                                    </Link>
                                </div>

                                {/* Help & Support */}
                                <div className="py-2 border-t border-zinc-800">
                                    <Link
                                        to="/help"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Help & Support
                                    </Link>

                                    <Link
                                        to="/about"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors duration-200"
                                        onClick={() => setIsSettingsOpen(false)}
                                    >
                                        <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        About
                                    </Link>
                                </div>

                                {/* Logout */}
                                <div className="py-2 border-t border-zinc-800">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}