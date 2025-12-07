import React, { useState } from 'react';
import { Search, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface HeroProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <div className="relative pt-32 pb-16 px-6 text-center">
      {/* Abstract Background Decoration */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-medium tracking-wide mb-6">
          V2.1 • UNRESTRICTED DOWNLOADER
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Any</span> Content.
        </h1>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The easiest way to download videos and music from YouTube. 
          Insert any link, select your quality, and download instantly.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 rounded-2xl border border-slate-700 p-2 shadow-2xl">
             <div className="pl-4 text-slate-500">
               <LinkIcon className="w-5 h-5" />
             </div>
             <input
               type="text"
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               placeholder="Paste YouTube URL here..."
               className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-slate-600 w-full"
             />
             <button
               type="submit"
               disabled={isLoading}
               className="px-6 py-3 bg-slate-800 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isLoading ? (
                 <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
               ) : (
                 <>
                   <span>Fetch</span>
                   <Search className="w-4 h-4" />
                 </>
               )}
             </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 flex items-center justify-center gap-2 text-red-400 bg-red-500/10 py-2 px-4 rounded-lg inline-block text-sm border border-red-500/20 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Hints */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['MP4 & MP3', '4K Support', 'No Ads', '100% Free'].map((feat, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-800/30 border border-white/5 text-slate-400 text-sm font-medium">
                {feat}
              </div>
            ))}
        </div>
        
        <div className="mt-8 text-xs text-slate-500">
          Try a video: <button onClick={() => setUrl('https://www.youtube.com/watch?v=ScMzIvxBSi4')} className="text-cyan-500 hover:underline">Sintel (Open Movie)</button>
          <br/>
          Try music: <button onClick={() => setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')} className="text-cyan-500 hover:underline ml-1">Music Video</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;