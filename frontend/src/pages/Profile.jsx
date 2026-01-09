import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useAuth } from '../context/useAuth';

export default function ProfilePage() {
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [isFollowing, setIsFollowing] = useState(false);
    //const [followersCount, setFollowersCount] = useState(0);
    //const [followingCount, setFollowingCount] = useState(0);

    const currentUser = useAuth();
    const currentUserName = currentUser?.user?.username || null;


    useEffect(() => {
        const fetchUserAndPosts = async () => {
            try {
                setLoading(true);
                const userResponse = await fetch(`http://localhost:3000/api/users/u/${username}`, {
                    credentials: "include"
                });
                const userData = await userResponse.json();
                setProfileUser(userData.user);

                const profileId = userData.user._id;

                // Check if current user is following this profile
                //if (currentUser) {
                // setIsFollowing(userData.user.followers?.includes(currentUser._id) || false);
                //}

                // Set followers/following counts
                //setFollowersCount(userData.user.followers?.length || 0);
                //setFollowingCount(userData.user.following?.length || 0);

                const postResponse = await fetch(`http://localhost:3000/api/posts/user/${profileId}`,
                    { credentials: "include" }
                );
                const data = await postResponse.json();
                setPosts(data.posts);

            } catch (error) {
                console.error("Error fetching user:", error);
            }
            finally {
                setLoading(false);
            }
        }

        if (!username) {
            return;
        }
        fetchUserAndPosts();
    }, [username]);



    // HardCoded as of now
    const isFollowing = false;
    const followersCount = 777;
    const followingCount = 77;


    const handleFollow = async () => {
    };

    const handleUnfollow = async () => {
    };

    const handleLike = () => {
    };

    const handleComment = () => {
    };

    const handleDelete = () => {
    };

    const isOwnProfile = currentUserName && profileUser
        ? currentUserName === profileUser.username
        : false;


    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <main className="max-w-3xl mx-auto px-4 py-8">

                <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6">

                    <div className="h-48 bg-linear-to-br from-zinc-800 via-zinc-700 to-zinc-800 relative">
                        <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">

                        <div className="flex justify-between items-start -mt-16 mb-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-zinc-900 bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-4xl font-bold shadow-xl">
                                    {profileUser?.name?.charAt(0) || profileUser?.username?.charAt(0) || "U"}

                                </div>
                                <button className="absolute bottom-1 right-1 w-9 h-9 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center border-2 border-zinc-900 transition">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            {isOwnProfile ? (
                                <button className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 text-sm">
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={isFollowing ? handleUnfollow : handleFollow}
                                    className={`mt-4 font-medium py-2 px-6 rounded-lg transition duration-200 text-sm ${isFollowing
                                            ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                >
                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                </button>
                            )}
                        </div>

                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-1">{profileUser.name}</h2>
                            <p className="text-zinc-400 text-sm mb-3">@{profileUser.username}</p>
                            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                                Software developer | Tech enthusiast | Coffee lover ☕ | Building cool things on the internet
                            </p>
                        </div>

                        <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
                            <div className="text-center">
                                <p className="text-xl font-bold">{posts.length}</p>
                                <p className="text-zinc-400 text-xs">Posts</p>
                            </div>
                            <div className="text-center cursor-pointer hover:opacity-80 transition">
                                <p className="text-xl font-bold">{followersCount}</p>
                                <p className="text-zinc-400 text-xs">Followers</p>
                            </div>
                            <div className="text-center cursor-pointer hover:opacity-80 transition">
                                <p className="text-xl font-bold">{followingCount}</p>
                                <p className="text-zinc-400 text-xs">Following</p>
                            </div>
                            <div className="text-center ml-auto">
                                <p className="text-zinc-400 text-xs">Joined</p>
                                <p className="text-sm font-medium">{new Date(profileUser.createdAt).toLocaleDateString("en-us", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="border-b border-zinc-800 mb-6">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'posts' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
                                }`}
                        >
                            Posts
                            {activeTab === 'posts' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('media')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'media' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
                                }`}
                        >
                            Media
                            {activeTab === 'media' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('likes')}
                            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'likes' ? 'text-white' : 'text-zinc-400 hover:text-zinc-300'
                                }`}
                        >
                            Likes
                            {activeTab === 'likes' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                            )}
                        </button>
                    </div>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-zinc-300">
                            {isOwnProfile ? 'My Posts' : `${profileUser.name}'s Posts`}
                        </h3>
                        {isOwnProfile && (
                            <Link to="/createpost" className="text-zinc-400 hover:text-white text-sm font-medium transition">
                                + Create Post
                            </Link>
                        )}
                    </div>

                    {activeTab === 'posts' && (
                        <div className="space-y-4">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <Post
                                        key={post._id}
                                        post={post}
                                        profileUser={profileUser}
                                        onLike={handleLike}
                                        onDelete={handleDelete}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-zinc-300 mb-2">No posts yet</h3>
                                    <p className="text-zinc-500 text-sm mb-4">
                                        {isOwnProfile ? 'Share your first post with your followers' : 'This user hasn\'t posted anything yet'}
                                    </p>
                                    {isOwnProfile && (
                                        <Link to="/createpost" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Create Post
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl">
                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-zinc-300 mb-2">No media yet</h3>
                            <p className="text-zinc-500 text-sm">Posts with photos and videos will appear here</p>
                        </div>
                    )}

                    {activeTab === 'likes' && (
                        <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl">
                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-zinc-300 mb-2">No likes yet</h3>
                            <p className="text-zinc-500 text-sm">Posts you've liked will appear here</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}