/*

// This is a dark theme navbar
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, Search, PlusSquare, MessageCircle, User, Settings } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

function Navbar({ currentPage = 'home' }) {
    const { user, logout } = useAuth();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);

    const currentUser = user ?? {};

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSettings = useCallback(() => {
        setIsSettingsOpen((prev) => !prev);
    }, []);

    const closeSettings = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col shadow-2xl">
            <div className="flex flex-col h-full px-4 py-6">

                <Link to="/feed" className="flex items-center gap-3 shrink-0 mb-8">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-lg font-bold text-white">V</span>
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Vibely
                    </span>
                </Link>

                <nav className="flex flex-col gap-2 flex-1">

                    <NavItem to="/feed" active={currentPage === 'home'} icon={Home}>
                        Home
                    </NavItem>

                    <NavItem to="/search" active={currentPage === 'search'} icon={Search}>
                        Search
                    </NavItem>

                    <NavItem to="/createpost" active={currentPage === 'createpost'} icon={PlusSquare}>
                        New Post
                    </NavItem>

                    <NavItem to="/chat" active={currentPage === 'chat'} icon={MessageCircle}>
                        Messages
                    </NavItem>

                    <Link
                        to={currentUser?.username ? `/u/${currentUser.username}` : '#'}
                        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${currentPage === 'profile'
                            ? 'bg-zinc-900/80 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                            }`}
                    >
                        {currentUser?.profileImage ? (
                            <img
                                src={currentUser.profileImage}
                                alt={currentUser.name}
                                className="w-5 h-5 rounded-full object-cover"
                            />
                        ) : (
                            <User size={20} />
                        )}
                        <span className="text-sm">Profile</span>
                    </Link>

                    <div className="relative mt-auto" ref={settingsRef}>
                        <button
                            onClick={toggleSettings}
                            className={`flex items-center gap-3 h-10 px-3 rounded-lg transition cursor-pointer w-full ${isSettingsOpen
                                ? 'bg-zinc-900/80 text-white'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                                }`}
                        >
                            <Settings size={20} />
                            <span className="text-sm">Settings</span>
                        </button>

                        {isSettingsOpen && (
                            <div className="absolute left-0 bottom-full mb-2 w-64 bg-[#0f0f0f] border border-zinc-800/50 rounded-xl shadow-2xl backdrop-blur-sm">
                                <div className="px-4 py-3 border-b border-zinc-800/50">
                                    <p className="font-semibold text-sm">
                                        {currentUser?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        @{currentUser?.username || 'unknown'}
                                    </p>
                                </div>

                                <MenuLink to="/settings/account" onClick={closeSettings}>
                                    Account Settings
                                </MenuLink>

                                <MenuLink to="/settings/privacy" onClick={closeSettings}>
                                    Privacy & Security
                                </MenuLink>

                                <MenuLink to="/settings/notifications" onClick={closeSettings}>
                                    Notifications
                                </MenuLink>

                                <div className="border-t border-zinc-800/50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-900/50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </aside>
    );
}

const NavItem = React.memo(({ to, active, icon: Icon, children }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${active
            ? 'bg-zinc-900/80 text-white'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
    >
        <Icon size={20} />
        <span className="text-sm">{children}</span>
    </Link>
));

const MenuLink = React.memo(({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900/50 rounded-lg mx-2"
    >
        {children}
    </Link>
));

export default React.memo(Navbar);

*/

/*

// This is a light theme navbar without matte finish
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, Search, PlusSquare, MessageCircle, User, Settings } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

function Navbar({ currentPage = 'home' }) {
    const { user, logout } = useAuth();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);

    const currentUser = user ?? {};

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // memoized handlers (important for React.memo)
    const toggleSettings = useCallback(() => {
        setIsSettingsOpen((prev) => !prev);
    }, []);

    const closeSettings = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-gray-200 bg-[#FFF8F0] flex flex-col shadow-sm">
            <div className="flex flex-col h-full px-4 py-6">

                <Link to="/feed" className="flex items-center gap-3 shrink-0 mb-8">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-800 to-black flex items-center justify-center shadow-md">
                        <span className="text-lg font-bold text-white">V</span>
                    </div>
                    <span className="text-xl font-bold text-black">
                        Vibely
                    </span>
                </Link>

                <nav className="flex flex-col gap-2 flex-1">


                    <NavItem to="/feed" active={currentPage === 'home'} icon={Home}>
                        Home
                    </NavItem>


                    <NavItem to="/search" active={currentPage === 'search'} icon={Search}>
                        Search
                    </NavItem>

                    <NavItem to="/createpost" active={currentPage === 'createpost'} icon={PlusSquare}>
                        New Post
                    </NavItem>

                    <NavItem to="/chat" active={currentPage === 'chat'} icon={MessageCircle}>
                        Messages
                    </NavItem>

                    <Link
                        to={currentUser?.username ? `/u/${currentUser.username}` : '#'}
                        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${currentPage === 'profile'
                            ? 'bg-gray-200 text-black'
                            : 'text-gray-600 hover:text-black hover:bg-gray-100'
                            }`}
                    >
                        {currentUser?.profileImage ? (
                            <img
                                src={currentUser.profileImage}
                                alt={currentUser.name}
                                className="w-5 h-5 rounded-full object-cover"
                            />
                        ) : (
                            <User size={20} />
                        )}
                        <span className="text-sm">Profile</span>
                    </Link>

                    <div className="relative mt-auto" ref={settingsRef}>
                        <button
                            onClick={toggleSettings}
                            className={`flex items-center gap-3 h-10 px-3 rounded-lg transition w-full ${isSettingsOpen
                                ? 'bg-gray-200 text-black'
                                : 'text-gray-600 hover:text-black hover:bg-gray-100'
                                }`}
                        >
                            <Settings size={20} />
                            <span className="text-sm">Settings</span>
                        </button>

                        {isSettingsOpen && (
                            <div className="absolute left-0 bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="font-semibold text-sm text-black">
                                        {currentUser?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        @{currentUser?.username || 'unknown'}
                                    </p>
                                </div>

                                <MenuLink to="/settings/account" onClick={closeSettings}>
                                    Account Settings
                                </MenuLink>

                                <MenuLink to="/settings/privacy" onClick={closeSettings}>
                                    Privacy & Security
                                </MenuLink>

                                <MenuLink to="/settings/notifications" onClick={closeSettings}>
                                    Notifications
                                </MenuLink>

                                <div className="border-t border-gray-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </aside>
    );
}

const NavItem = React.memo(({ to, active, icon: Icon, children }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${active
            ? 'bg-gray-200 text-black'
            : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
    >
        <Icon size={20} />
        <span className="text-sm">{children}</span>
    </Link>
));

const MenuLink = React.memo(({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-black rounded-lg mx-2"
    >
        {children}
    </Link>
));

export default React.memo(Navbar);


*/

// This is a dark theme navbar
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Home,
    Search,
    PlusSquare,
    MessageCircle,
    User,
    Settings,
    Sun,
    Moon
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

function Navbar({ currentPage = 'home' }) {
    const { user, logout, updateTheme } = useAuth();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);

    // ⛔ safety guard
    if (!user) return null;

    const currentUser = user;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSettings = useCallback(() => {
        setIsSettingsOpen((prev) => !prev);
    }, []);

    const closeSettings = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    const isDark = user.theme === 'dark';

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col shadow-2xl">
            <div className="flex flex-col h-full px-4 py-6">

                <Link to="/feed" className="flex items-center gap-3 shrink-0 mb-8">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-lg font-bold text-white">V</span>
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Vibely
                    </span>
                </Link>

                <nav className="flex flex-col gap-2 flex-1">

                    <NavItem to="/feed" active={currentPage === 'home'} icon={Home}>
                        Home
                    </NavItem>

                    <NavItem to="/search" active={currentPage === 'search'} icon={Search}>
                        Search
                    </NavItem>

                    <NavItem to="/createpost" active={currentPage === 'createpost'} icon={PlusSquare}>
                        New Post
                    </NavItem>

                    <NavItem to="/chat" active={currentPage === 'chat'} icon={MessageCircle}>
                        Messages
                    </NavItem>

                    <Link
                        to={`/u/${currentUser.username}`}
                        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${
                            currentPage === 'profile'
                                ? 'bg-zinc-900/80 text-white'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                        }`}
                    >
                        <User size={20} />
                        <span className="text-sm">Profile</span>
                    </Link>

                    <div className="relative mt-auto" ref={settingsRef}>
                        <button
                            onClick={toggleSettings}
                            className={`flex items-center gap-3 h-10 px-3 rounded-lg transition cursor-pointer w-full ${
                                isSettingsOpen
                                    ? 'bg-zinc-900/80 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                            }`}
                        >
                            <Settings size={20} />
                            <span className="text-sm">Settings</span>
                        </button>

                        {isSettingsOpen && (
                            <div className="absolute left-0 bottom-full mb-2 w-64 bg-[#0f0f0f] border border-zinc-800/50 rounded-xl shadow-2xl backdrop-blur-sm">
                                <div className="px-4 py-3 border-b border-zinc-800/50">
                                    <p className="font-semibold text-sm">
                                        {currentUser.name}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        @{currentUser.username}
                                    </p>
                                </div>

                                <MenuLink to="/settings/account" onClick={closeSettings}>
                                    Account Settings
                                </MenuLink>

                                <MenuLink to="/settings/privacy" onClick={closeSettings}>
                                    Privacy & Security
                                </MenuLink>

                                <MenuLink to="/settings/notifications" onClick={closeSettings}>
                                    Notifications
                                </MenuLink>

                                {/* 🌗 THEME TOGGLE — ONLY ADDITION */}
                                <button
                                    onClick={() =>
                                        updateTheme(isDark ? 'light' : 'dark')
                                    }
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900/50 rounded-lg mx-2"
                                >
                                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                    {isDark ? 'Light Mode' : 'Dark Mode'}
                                </button>

                                <div className="border-t border-zinc-800/50 mt-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-900/50 rounded-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </aside>
    );
}

const NavItem = React.memo(({ to, active, icon: Icon, children }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 h-10 px-3 rounded-lg transition ${
            active
                ? 'bg-zinc-900/80 text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
        }`}
    >
        <Icon size={20} />
        <span className="text-sm">{children}</span>
    </Link>
));

const MenuLink = React.memo(({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900/50 rounded-lg mx-2"
    >
        {children}
    </Link>
));

export default React.memo(Navbar);
