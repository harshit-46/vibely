import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Validate email
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    const handleTryAgain = () => {
        setIsSuccess(false);
        setEmail('');
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Success Card */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl text-center">
                        {/* Success Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/20 mb-6">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-3">Check your email</h1>
                        <p className="text-zinc-400 text-sm mb-2">
                            We've sent a password reset link to
                        </p>
                        <p className="text-white font-medium mb-6">{email}</p>

                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-6">
                            <p className="text-zinc-300 text-sm leading-relaxed">
                                Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Link
                                to="/"
                                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                            >
                                Back to Login
                            </Link>
                            <button
                                onClick={handleTryAgain}
                                className="block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                            >
                                Try another email
                            </button>
                        </div>

                        {/* Resend */}
                        <p className="text-zinc-500 text-sm mt-6">
                            Didn't receive the email?{' '}
                            <button className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200">
                                Resend
                            </button>
                        </p>
                    </div>

                    {/* Back to Login */}
                    <p className="text-center text-zinc-400 text-sm mt-6">
                        Remember your password?{' '}
                        <Link to="/" className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-blue-700 mb-4">
                        <span className="text-2xl font-bold text-white">P</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                    <p className="text-zinc-400 text-sm">No worries, we'll send you reset instructions</p>
                </div>

                {/* Forgot Password Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
                    <div className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Info Box */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-blue-300 text-sm font-medium mb-1">Password Reset</p>
                                    <p className="text-blue-200/70 text-xs leading-relaxed">
                                        Enter your email address and we'll send you a link to reset your password.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className={`w-full bg-zinc-800 border ${error ? 'border-red-500' : 'border-zinc-700'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Send Reset Link</span>
                                </>
                            )}
                        </button>

                        {/* Back to Login */}
                        <div className="text-center">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}