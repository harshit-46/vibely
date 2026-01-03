import React from 'react';

const Footer = () => {
    return (
        <div>
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
    )
}

export default Footer