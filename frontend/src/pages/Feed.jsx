import React, { useState } from 'react';

// Navbar Component
function Navbar({ currentUser, currentPage = 'home' }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                            <span className="text-lg font-bold">P</span>
                        </div>
                        <span className="text-xl font-semibold hidden sm:block">PostHub</span>
                    </a>

                    <nav className="flex items-center gap-1">
                        <a href="/" className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${currentPage === 'home' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                            <svg className="w-5 h-5" fill={currentPage === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Home</span>
                        </a>

                        <a href="/search" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden md:inline text-sm font-medium">Search</span>
                        </a>

                        <a href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                            <div className="w-5 h-5 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-xs font-semibold">
                                {currentUser.name.charAt(0)}
                            </div>
                            <span className="hidden md:inline text-sm font-medium">Profile</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

// Post Component
function Post({ post, currentUser, onLike, onComment, onDelete }) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    const isLiked = post.likes.includes(currentUser.id);

    return (
        <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition duration-200">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <a href={`/profile/${post.user.username}`} className="shrink-0">
                        <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-sm font-semibold hover:scale-105 transition">
                            {post.user.name.charAt(0)}
                        </div>
                    </a>
                    <div>
                        <a href={`/profile/${post.user.username}`} className="hover:underline">
                            <h4 className="font-semibold text-sm text-white">{post.user.name}</h4>
                        </a>
                        <div className="flex items-center gap-2">
                            <a href={`/profile/${post.user.username}`} className="text-zinc-400 text-xs hover:underline">
                                @{post.user.username}
                            </a>
                            <span className="text-zinc-600">•</span>
                            <small className="text-zinc-500 text-xs">{post.date}</small>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="text-zinc-500 hover:text-zinc-300 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg py-2 z-10">
                            {currentUser.id === post.user.id ? (
                                <>
                                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition">
                                        Edit Post
                                    </button>
                                    <button onClick={() => onDelete(post.id)} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition">
                                        Delete Post
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition">
                                        Report Post
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition">
                                        Hide Post
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
                <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.imageUrl && (
                <div className="rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 mb-4">
                    <img src={post.imageUrl} className="w-full h-auto" alt="Post" />
                </div>
            )}

            {/* Post Stats */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3 pb-3 border-b border-zinc-800">
                <span className="hover:underline cursor-pointer">{post.likes.length} likes</span>
                <span className="hover:underline cursor-pointer">{post.comments.length} comments</span>
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pb-3 border-b border-zinc-800">
                <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 transition text-sm group ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}>
                    <svg className={`w-5 h-5 ${isLiked ? 'fill-red-500' : 'group-hover:fill-red-500'}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                </button>

                <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition text-sm group">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                </button>

                <button className="flex items-center gap-2 text-zinc-500 hover:text-green-500 transition text-sm group ml-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4">
                    {/* Add Comment */}
                    <div onSubmit={handleCommentSubmit} className="mb-4">
                        <div className="flex gap-3">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-zinc-700 to-zinc-600 flex items-center justify-center text-xs font-semibold shrink-0">
                                {currentUser.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    rows="2"
                                    placeholder="Write a comment..."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => setShowComments(false)} type="button" className="text-zinc-400 hover:text-white text-xs px-3 py-1.5 rounded transition">
                                        Cancel
                                    </button>
                                    <button onClick={handleCommentSubmit} type="button" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-1.5 rounded-lg transition">
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {post.comments.length > 0 ? (
                            post.comments.map(comment => (
                                <div key={comment.id} className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-zinc-700 to-zinc-600 flex items-center justify-center text-xs font-semibold shrink-0">
                                        {comment.user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-zinc-800 rounded-lg px-3 py-2">
                                            <a href={`/profile/${comment.user.username}`} className="font-semibold text-sm hover:underline">
                                                {comment.user.name}
                                            </a>
                                            <p className="text-zinc-200 text-sm mt-1">{comment.content}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 ml-3">
                                            <small className="text-zinc-500 text-xs">{comment.date}</small>
                                            <button className="text-zinc-500 hover:text-zinc-300 text-xs transition">Like</button>
                                            <button className="text-zinc-500 hover:text-zinc-300 text-xs transition">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-zinc-500 text-sm py-4">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                </div>
            )}
        </article>
    );
}

// Main Feed Page
export default function FeedPage() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: { id: 2, name: 'Alice Smith', username: 'alicesmith' },
            content: 'Just finished working on a new project! Really excited about how it turned out. The structured design makes everything so much cleaner and easier to maintain. 🚀',
            date: 'December 31, 2025',
            likes: [1, 3, 5],
            comments: [
                { id: 1, user: { name: 'Bob Jones', username: 'bobjones' }, content: 'This looks amazing! Great work!', date: 'December 31, 2025' }
            ],
            imageUrl: null
        },
        {
            id: 2,
            user: { id: 3, name: 'John Doe', username: 'johndoe' },
            content: 'Beautiful sunset view from my workspace today! Sometimes you need to take a moment to appreciate the little things. 🌅',
            date: 'December 30, 2025',
            likes: [1, 2],
            comments: [],
            imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        },
        {
            id: 3,
            user: { id: 2, name: 'Alice Smith', username: 'alicesmith' },
            content: 'Learning something new every day! Today I dove into advanced CSS techniques and I\'m amazed at what you can do with modern web technologies. 💻✨',
            date: 'December 28, 2025',
            likes: [1],
            comments: [],
            imageUrl: null
        }
    ]);

    const currentUser = { id: 1, name: 'Current User', username: 'currentuser' };

    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const isLiked = post.likes.includes(currentUser.id);
                return {
                    ...post,
                    likes: isLiked
                        ? post.likes.filter(id => id !== currentUser.id)
                        : [...post.likes, currentUser.id]
                };
            }
            return post;
        }));
    };

    const handleComment = (postId, content) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [
                        ...post.comments,
                        {
                            id: post.comments.length + 1,
                            user: currentUser,
                            content,
                            date: 'Just now'
                        }
                    ]
                };
            }
            return post;
        }));
    };

    const handleDelete = (postId) => {
        if (confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar currentUser={currentUser} currentPage="home" />

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Create Post Section */}
                <section className="mb-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-sm font-semibold">
                                {currentUser.name.charAt(0)}
                            </div>
                            <a href="/createpost" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white py-3 px-4 rounded-lg transition duration-200 text-sm cursor-pointer">
                                What's on your mind?
                            </a>
                        </div>
                        <div className="flex items-center justify-end">
                            <a href="/createpost" className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-5 rounded-lg transition duration-200 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                New Post
                            </a>
                        </div>
                    </div>
                </section>

                {/* Posts Feed */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 text-zinc-300">Recent Posts</h2>
                    <div className="space-y-4">
                        {posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                currentUser={currentUser}
                                onLike={handleLike}
                                onComment={handleComment}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}