import React, { useState } from 'react';
import UserCard from '../components/UserCard';

// Main Search Users Page
export default function SearchUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('relevance');
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            bio: 'Software developer | Tech enthusiast | Coffee lover ☕',
            avatarColor: 'from-blue-600 to-blue-700',
            posts: 245,
            followers: [2, 3, 5],
            following: 543
        },
        {
            id: 2,
            name: 'Alice Smith',
            username: 'alicesmith',
            bio: 'Designer & Creative Director | Building beautiful experiences',
            avatarColor: 'from-purple-600 to-purple-700',
            posts: 178,
            followers: [1, 3],
            following: 421
        },
        {
            id: 3,
            name: 'Mike Brown',
            username: 'mikebrown',
            bio: 'Photographer | Travel enthusiast | Capturing moments around the world 📸',
            avatarColor: 'from-green-600 to-green-700',
            posts: 512,
            followers: [1, 2, 4, 5],
            following: 678
        },
        {
            id: 4,
            name: 'Emily Johnson',
            username: 'emilyjohnson',
            bio: 'Content creator | Food blogger | Sharing recipes and food adventures',
            avatarColor: 'from-pink-600 to-pink-700',
            posts: 324,
            followers: [1, 2],
            following: 890
        },
        {
            id: 5,
            name: 'David Wilson',
            username: 'davidwilson',
            bio: 'Entrepreneur | Startup founder | Building the future of technology',
            avatarColor: 'from-orange-600 to-orange-700',
            posts: 156,
            followers: [1, 2, 3],
            following: 234
        },
        {
            id: 6,
            name: 'Sarah Taylor',
            username: 'sarahtaylor',
            bio: 'Writer | Bookworm | Sharing stories and literary insights',
            avatarColor: 'from-cyan-600 to-cyan-700',
            posts: 289,
            followers: [1],
            following: 967
        }
    ]);

    const currentUser = { id: 1, name: 'Current User', username: 'currentuser' };

    const handleFollow = (userId) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const isFollowing = user.followers.includes(currentUser.id);
                return {
                    ...user,
                    followers: isFollowing
                        ? user.followers.filter(id => id !== currentUser.id)
                        : [...user.followers, currentUser.id]
                };
            }
            return user;
        }));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = searchQuery === '' ||
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.bio.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'all') return matchesSearch;
        if (activeFilter === 'following') return matchesSearch && user.followers.includes(currentUser.id);
        if (activeFilter === 'followers') return matchesSearch; 
        if (activeFilter === 'suggested') return matchesSearch && !user.followers.includes(currentUser.id);

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <a href="/" className="text-zinc-400 hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </a>
                            <h1 className="text-xl font-semibold">Search Users</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <a href="/" className="text-zinc-400 hover:text-white font-medium transition duration-200 text-sm">
                                Home
                            </a>
                            <a href="/profile" className="text-zinc-400 hover:text-white font-medium transition duration-200 text-sm">
                                Profile
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Search Section */}
                <section className="mb-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="space-y-4">
                            {/* Search Input */}
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by username or name..."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                                />
                            </div>

                            {/* Filter Options */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-sm text-zinc-400">Filter by:</span>
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeFilter === 'all'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                        }`}
                                >
                                    All Users
                                </button>
                                <button
                                    onClick={() => setActiveFilter('following')}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeFilter === 'following'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                        }`}
                                >
                                    Following
                                </button>
                                <button
                                    onClick={() => setActiveFilter('followers')}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeFilter === 'followers'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                        }`}
                                >
                                    Followers
                                </button>
                                <button
                                    onClick={() => setActiveFilter('suggested')}
                                    className={`px-4 py-2 rounded-lg text-sm transition ${activeFilter === 'suggested'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                        }`}
                                >
                                    Suggested
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Results */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-zinc-300">
                            {filteredUsers.length} Users Found
                        </h2>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="relevance">Sort by: Relevance</option>
                            <option value="followers">Most Followers</option>
                            <option value="posts">Most Posts</option>
                            <option value="recent">Recently Joined</option>
                        </select>
                    </div>

                    {filteredUsers.length > 0 ? (
                        <div className="space-y-3">
                            {filteredUsers.map(user => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    currentUser={currentUser}
                                    onFollow={handleFollow}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-zinc-300 mb-2">No users found</h3>
                            <p className="text-zinc-500 text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Load More */}
                    {filteredUsers.length > 0 && (
                        <div className="mt-6 text-center">
                            <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-8 py-3 rounded-lg transition">
                                Load More Users
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-5xl mx-auto px-6 py-8 mt-12 border-t border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                    <p className="text-zinc-500">© 2025 PostHub</p>
                    <div className="flex items-center gap-6">
                        <a href="/about" className="text-zinc-400 hover:text-white transition">About</a>
                        <a href="/terms" className="text-zinc-400 hover:text-white transition">Terms</a>
                        <a href="/privacy" className="text-zinc-400 hover:text-white transition">Privacy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}