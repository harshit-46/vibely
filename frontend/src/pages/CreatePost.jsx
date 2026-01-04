import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { useAuth } from '../context/useAuth';
import useCreatePost from '../hooks/useCreatePost';

export default function CreatePost() {
    const {createPost} = useCreatePost();
    const {user} = useAuth();
    const [content, setContent] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
        allowComments: true,
        showLikes: true
    });

    const currentUser = user || {};

    const charLimit = 5000;
    const maxFileSize = 50 * 1024 * 1024;

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size
        if (file.size > maxFileSize) {
            alert('File size must be less than 50MB');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            alert('Only images and videos are allowed');
            return;
        }

        setMediaFile(file);
        setMediaType(file.type.startsWith('image/') ? 'image' : 'video');

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setMediaPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveMedia = () => {
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
        document.getElementById('mediaInput').value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert('Please write something before posting');
            return;
        }

        setIsLoading(true);
        try {
            await createPost({
                content,
                media: mediaFile,
            });
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        } finally {
            setIsLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <Navbar/>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center text-lg font-semibold">
                            {currentUser.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">@{currentUser.username}</h3>
                            <p className="text-zinc-400 text-xs">Posting as {currentUser.name}</p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-sm font-medium text-zinc-300">
                            What's on your mind?
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="8"
                            placeholder="Share your thoughts..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none transition"
                        />
                        <p className={`text-xs text-right ${content.length > charLimit ? 'text-red-400' : 'text-zinc-500'}`}>
                            {content.length} / {charLimit} characters
                        </p>
                    </div>

                    {/* Media Upload Section */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-zinc-300">
                            Add Media (Optional)
                        </label>

                        {!mediaPreview ? (
                            <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-zinc-700 transition cursor-pointer bg-zinc-900/50">
                                <input
                                    type="file"
                                    id="mediaInput"
                                    accept="image/*,video/*"
                                    onChange={handleMediaChange}
                                    className="hidden"
                                />
                                <label htmlFor="mediaInput" className="cursor-pointer">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-zinc-400 mb-1">Click to upload or drag and drop</p>
                                    <p className="text-zinc-500 text-xs">Images or Videos (Max 50MB)</p>
                                </label>
                            </div>
                        ) : (
                            <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                                {/* Preview */}
                                {mediaType === 'image' ? (
                                    <img src={mediaPreview} className="w-full h-auto" alt="Preview" />
                                ) : (
                                    <video src={mediaPreview} className="w-full h-auto" controls />
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={handleRemoveMedia}
                                    className="absolute top-3 right-3 w-8 h-8 bg-zinc-950/90 hover:bg-red-600 rounded-full flex items-center justify-center transition group"
                                >
                                    <svg className="w-5 h-5 text-zinc-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* File Info */}
                                <div className="p-3 bg-zinc-900/90 border-t border-zinc-800">
                                    <p className="text-sm text-zinc-300">{mediaFile?.name}</p>
                                    <p className="text-xs text-zinc-500">{formatFileSize(mediaFile?.size || 0)}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !content.trim()}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Posting...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span>Post</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}