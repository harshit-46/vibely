/*


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
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const { user, logout, updateTheme } = useAuth();
    const location = useLocation();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);
    const [isHovered , setIsHovered] = useState(false);

    const isDark = user?.theme === 'dark';
    const pathname = location.pathname;

    const isFeedPage = pathname === '/feed';

    const isExpanded = isHovered || isFeedPage;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsSettingsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    const toggleSettings = useCallback(() => {
        setIsSettingsOpen((prev) => !prev);
    }, []);

    const closeSettings = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    if (!user) return null;
    const currentUser = user;

    return (
        <aside 
            className={`
            fixed top-0 left-0 z-30    
            h-screen
                bg-[#F9FAFB] dark:bg-neutral-950
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'w-64' : 'w-20'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsSettingsOpen(false);
            }}
        >
            <div className="flex flex-col h-full px-4 py-6">
                <Link to="/feed" className="flex items-center gap-3 mb-8 overflow-hidden">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shadow-sm shrink-0">
                        <span className="text-lg font-bold text-white">V</span>
                    </div>
                    <span 
                        className={`
                            text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100
                            whitespace-nowrap transition-all duration-300
                            ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                        `}
                    >
                        Wesnap
                    </span>
                </Link>

                <nav className="flex flex-col gap-2 flex-1">

                    <NavItem 
                        to="/feed" 
                        active={pathname === '/feed'} 
                        icon={Home}
                        isExpanded={isExpanded}
                    >
                        Home
                    </NavItem>

                    <NavItem 
                        to="/search" 
                        active={pathname.startsWith('/search')} 
                        icon={Search}
                        isExpanded={isExpanded}
                    >
                        Search
                    </NavItem>

                    <NavItem 
                        to="/createpost" 
                        active={pathname === '/createpost'} 
                        icon={PlusSquare}
                        isExpanded={isExpanded}
                    >
                        New Post
                    </NavItem>

                    <NavItem 
                        to="/chat" 
                        active={pathname.startsWith('/chat')} 
                        icon={MessageCircle}
                        isExpanded={isExpanded}
                    >
                        Messages
                    </NavItem>

                    <NavItem
                        to={`/u/${currentUser.username}`}
                        active={pathname.startsWith('/u/')}
                        icon={User}
                        isExpanded={isExpanded}
                    >
                        Profile
                    </NavItem>

                    <div className="relative mt-auto" ref={settingsRef}>
                        <button
                            onClick={toggleSettings}
                            aria-haspopup="menu"
                            aria-expanded={isSettingsOpen}
                            className={`
                                flex items-center gap-3 h-10 px-3 rounded-xl transition w-full
                                ${isSettingsOpen
                                    ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                    : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/60 cursor-pointer'
                                }
                            `}
                        >
                            <Settings size={20} className="shrink-0" />
                            <span 
                                className={`
                                    text-sm font-medium whitespace-nowrap transition-all duration-300
                                    ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                                `}
                            >
                                Settings
                            </span>
                        </button>

                        {isSettingsOpen && isExpanded && (
                            <div className="
                                absolute left-0 bottom-full mb-2 w-64 rounded-xl shadow-lg
                                bg-white dark:bg-neutral-900
                                border border-neutral-200 dark:border-neutral-800
                                z-50
                            ">
                                <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                                    <p className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                        {currentUser.name}
                                    </p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        @{currentUser.username}
                                    </p>
                                </div>

                                <div className="py-2 px-2">
                                    <MenuLink to="/accounts" onClick={closeSettings}>
                                        Settings
                                    </MenuLink>
                                    <MenuLink to="/your_activity" onClick={closeSettings}>
                                        Your activity
                                    </MenuLink>
                                    <MenuLink to="/report" onClick={closeSettings}>
                                        Report a problem
                                    </MenuLink>

                                    <button
                                        onClick={() => updateTheme(isDark ? 'light' : 'dark')}
                                        className="
                                            w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl
                                            text-neutral-700 hover:bg-neutral-50
                                            dark:text-neutral-300 dark:hover:bg-neutral-800/60 cursor-pointer
                                        "
                                    >
                                        {isDark ? 'Light Mode' : 'Dark Mode'}
                                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                    </button>
                                </div>

                                <div className="border-t border-neutral-200 dark:border-neutral-800 px-2 py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="
                                            w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl
                                            text-red-600 hover:bg-red-50/70
                                            dark:text-red-400 dark:hover:bg-red-900/40 cursor-pointer
                                        "
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

const NavItem = React.memo(({ to, active, icon: Icon, children, isExpanded }) => (
    <Link
        to={to}
        className={`
            flex items-center gap-3 h-10 px-3 rounded-xl transition font-medium text-sm
            ${active
                ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/60'
            }
        `}
    >
        <Icon size={20} className="shrink-0" />
        <span 
            className={`
                whitespace-nowrap transition-all duration-300
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
            `}
        >
            {children}
        </span>
    </Link>
));

const MenuLink = React.memo(({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="
            block px-4 py-2.5 text-sm font-medium rounded-xl
            text-neutral-700 hover:bg-neutral-50
            dark:text-neutral-300 dark:hover:bg-neutral-800/60
        "
    >
        {children}
    </Link>
));

export default React.memo(Navbar);


*/


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
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const { user, logout, updateTheme } = useAuth();
    const location = useLocation();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const isDark = user?.theme === 'dark';
    const pathname = location.pathname;

    const isFeedPage = pathname === '/feed';

    const isExpanded = isHovered || isFeedPage;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setIsSettingsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) root.classList.add('dark');
        else root.classList.remove('dark');
    }, [isDark]);

    const toggleSettings = useCallback(() => {
        setIsSettingsOpen((prev) => !prev);
    }, []);

    const closeSettings = useCallback(() => {
        setIsSettingsOpen(false);
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
    }, [logout]);

    if (!user) return null;
    const currentUser = user;

    return (
        <>
            {/* Desktop Sidebar - hidden on mobile */}
            <aside
                className={`
                    fixed top-0 left-0 z-30    
                    h-screen
                    bg-[#F9FAFB] dark:bg-neutral-950
                    transition-all duration-300 ease-in-out
                    ${isExpanded ? 'w-64' : 'w-20'}
                    hidden md:block
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsSettingsOpen(false);
                }}
            >
                <div className="flex flex-col h-full px-4 py-6">
                    <Link to="/feed" className="flex items-center gap-3 mb-8 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shadow-sm shrink-0">
                            <span className="text-lg font-bold text-white">V</span>
                        </div>
                        <span
                            className={`
                                text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100
                                whitespace-nowrap transition-all duration-300
                                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                            `}
                        >
                            Wesnap
                        </span>
                    </Link>

                    <nav className="flex flex-col gap-2 flex-1">

                        <NavItem
                            to="/feed"
                            active={pathname === '/feed'}
                            icon={Home}
                            isExpanded={isExpanded}
                        >
                            Home
                        </NavItem>

                        <NavItem
                            to="/search"
                            active={pathname.startsWith('/search')}
                            icon={Search}
                            isExpanded={isExpanded}
                        >
                            Search
                        </NavItem>

                        <NavItem
                            to="/createpost"
                            active={pathname === '/createpost'}
                            icon={PlusSquare}
                            isExpanded={isExpanded}
                        >
                            New Post
                        </NavItem>

                        <NavItem
                            to="/chat"
                            active={pathname.startsWith('/chat')}
                            icon={MessageCircle}
                            isExpanded={isExpanded}
                        >
                            Messages
                        </NavItem>

                        <NavItem
                            to={`/u/${currentUser.username}`}
                            active={pathname.startsWith('/u/')}
                            icon={User}
                            isExpanded={isExpanded}
                        >
                            Profile
                        </NavItem>

                        <div className="relative mt-auto" ref={settingsRef}>
                            <button
                                onClick={toggleSettings}
                                aria-haspopup="menu"
                                aria-expanded={isSettingsOpen}
                                className={`
                                    flex items-center gap-3 h-10 px-3 rounded-xl transition w-full
                                    ${isSettingsOpen
                                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                        : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/60 cursor-pointer'
                                    }
                                `}
                            >
                                <Settings size={20} className="shrink-0" />
                                <span
                                    className={`
                                        text-sm font-medium whitespace-nowrap transition-all duration-300
                                        ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                                    `}
                                >
                                    Settings
                                </span>
                            </button>

                            {isSettingsOpen && isExpanded && (
                                <div className="
                                    absolute left-0 bottom-full mb-2 w-64 rounded-xl shadow-lg
                                    bg-white dark:bg-neutral-900
                                    border border-neutral-200 dark:border-neutral-800
                                    z-50
                                ">
                                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                                        <p className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                            {currentUser.name}
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                            @{currentUser.username}
                                        </p>
                                    </div>

                                    <div className="py-2 px-2">
                                        <MenuLink to="/accounts" onClick={closeSettings}>
                                            Settings
                                        </MenuLink>
                                        <MenuLink to="/your_activity" onClick={closeSettings}>
                                            Your activity
                                        </MenuLink>
                                        <MenuLink to="/report" onClick={closeSettings}>
                                            Report a problem
                                        </MenuLink>

                                        <button
                                            onClick={() => updateTheme(isDark ? 'light' : 'dark')}
                                            className="
                                                w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl
                                                text-neutral-700 hover:bg-neutral-50
                                                dark:text-neutral-300 dark:hover:bg-neutral-800/60 cursor-pointer
                                            "
                                        >
                                            {isDark ? 'Light Mode' : 'Dark Mode'}
                                            {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                        </button>
                                    </div>

                                    <div className="border-t border-neutral-200 dark:border-neutral-800 px-2 py-2">
                                        <button
                                            onClick={handleLogout}
                                            className="
                                                w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl
                                                text-red-600 hover:bg-red-50/70
                                                dark:text-red-400 dark:hover:bg-red-900/40 cursor-pointer
                                            "
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

            {/* Mobile Bottom Navigation */}
            <nav className="
                fixed bottom-0 left-0 right-0 z-30
                bg-white dark:bg-neutral-950
                border-t border-neutral-200 dark:border-neutral-800
                md:hidden
                safe-area-inset-bottom
            ">
                <div className="flex items-center justify-around h-16 px-2">
                    <MobileNavItem
                        to="/feed"
                        active={pathname === '/feed'}
                        icon={Home}
                    />
                    <MobileNavItem
                        to="/search"
                        active={pathname.startsWith('/search')}
                        icon={Search}
                    />
                    <MobileNavItem
                        to="/createpost"
                        active={pathname === '/createpost'}
                        icon={PlusSquare}
                    />
                    <MobileNavItem
                        to="/chat"
                        active={pathname.startsWith('/chat')}
                        icon={MessageCircle}
                    />
                    <MobileNavItem
                        to={`/u/${currentUser.username}`}
                        active={pathname.startsWith('/u/')}
                        icon={User}
                    />
                </div>
            </nav>
        </>
    );
}

const NavItem = React.memo(({ to, active, icon: Icon, children, isExpanded }) => (
    <Link
        to={to}
        className={`
            flex items-center gap-3 h-10 px-3 rounded-xl transition font-medium text-sm
            ${active
                ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/60'
            }
        `}
    >
        <Icon size={20} className="shrink-0" />
        <span
            className={`
                whitespace-nowrap transition-all duration-300
                ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
            `}
        >
            {children}
        </span>
    </Link>
));

const MobileNavItem = React.memo(({ to, active, icon: Icon }) => (
    <Link
        to={to}
        className={`
            flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl transition-colors
            ${active
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-600 dark:text-neutral-400'
            }
        `}
    >
        <Icon size={24} className={active ? 'fill-current' : ''} />
    </Link>
));

const MenuLink = React.memo(({ to, onClick, children }) => (
    <Link
        to={to}
        onClick={onClick}
        className="
            block px-4 py-2.5 text-sm font-medium rounded-xl
            text-neutral-700 hover:bg-neutral-50
            dark:text-neutral-300 dark:hover:bg-neutral-800/60
        "
    >
        {children}
    </Link>
));

export default React.memo(Navbar);