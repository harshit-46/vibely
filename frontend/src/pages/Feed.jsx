import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Post from '../components/Post';
import Navbar from '../components/navbar';

export default function FeedPage() {
    const [posts, setPosts] = useState([]);

    const currentUser = {
        id: 1,
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1'
    }; // dummy

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
            <Navbar/>
            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Create Post Section */}
                <section className="mb-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-sm font-semibold">
                                {currentUser.name.charAt(0)}
                            </div>
                            <Link to="/createpost" className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white py-3 px-4 rounded-lg transition duration-200 text-sm cursor-pointer">
                                What's on your mind?
                            </Link>
                        </div>
                        <div className="flex items-center justify-end">
                            <Link to="/createpost" className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-5 rounded-lg transition duration-200 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                New Post
                            </Link>
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