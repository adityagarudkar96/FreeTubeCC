
import React, { useState } from 'react';
import { VideoMetadata } from '../types';
import { Download, CheckCircle, FileVideo, Music, Clock, Eye, Calendar, Lock, AlertTriangle, WifiOff } from 'lucide-react';
import { getDownloadUrl } from '../services/mockBackend';

interface VideoResultProps {
  metadata: VideoMetadata;
  onReset: () => void;
}

const VideoResult: React.FC<VideoResultProps> = ({ metadata, onReset }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>(metadata.formats[0]?.id || '');
  const [isStarting, setIsStarting] = useState(false);

  // Reconstruct original URL from ID
  const originalUrl = `https://www.youtube.com/watch?v=${metadata.id}`;

  const handleDownload = () => {
    if (!selectedFormat) return;
    
    if (metadata.serverOffline) {
      alert("Demo Mode: The backend server is offline. Please start 'node server.js' to enable real downloads.");
      return;
    }

    setIsStarting(true);
    
    // Generate the direct download URL with title for better filename
    const downloadLink = getDownloadUrl(originalUrl, selectedFormat) + `&title=${encodeURIComponent(metadata.title)}`;
    
    // Trigger download
    window.location.href = downloadLink;

    setTimeout(() => {
      setIsStarting(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 animate-in slide-in-from-bottom-10 duration-700 pb-20">
      
      {/* Offline Warning Banner */}
      {metadata.serverOffline && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-200">
          <div className="p-2 bg-amber-500/20 rounded-full">
            <WifiOff className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm">Backend Disconnected</h3>
            <p className="text-xs opacity-80">You are viewing demo data. To download real videos, ensure <code className="bg-black/30 px-1 rounded">node server.js</code> is running on port 3001.</p>
          </div>
        </div>
      )}

      <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20">
        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left Column: Visuals */}
          <div className="relative group h-full min-h-[300px] md:min-h-full">
            <img src={metadata.thumbnail} alt={metadata.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 {metadata.isCC ? (
                   <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 flex items-center gap-1">
                     <CheckCircle className="w-3 h-3" /> Creative Commons
                   </span>
                 ) : (
                   <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 flex items-center gap-1">
                     <Lock className="w-3 h-3" /> Standard License
                   </span>
                 )}
                 <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs backdrop-blur-sm border border-slate-700">
                   {metadata.channel}
                 </span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight mb-2 line-clamp-3">{metadata.title}</h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {metadata.duration}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3"/> {parseInt(metadata.views as any).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {metadata.uploadDate}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="p-8 flex flex-col justify-center bg-slate-900/40 backdrop-blur-md border-l border-white/5">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-semibold text-white">Select Quality</h3>
               <button onClick={onReset} className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                 New Search
               </button>
            </div>
            
            <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
              {metadata.formats.map((fmt) => (
                <div 
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                    selectedFormat === fmt.id 
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-900/10' 
                      : 'bg-slate-800/40 border-slate-700 hover:border-slate-600 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${selectedFormat === fmt.id ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-700/80'}`}>
                      {fmt.ext.includes('mp3') || fmt.ext.includes('m4a') ? <Music className="w-5 h-5"/> : <FileVideo className="w-5 h-5"/>}
                    </div>
                    <div>
                      <p className={`font-medium transition-colors ${selectedFormat === fmt.id ? 'text-white' : 'text-slate-300'}`}>
                        {fmt.ext.toUpperCase()} <span className="text-xs opacity-70">• {fmt.resolution}</span>
                      </p>
                      {fmt.note && <p className="text-[10px] text-slate-500">{fmt.note}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">
                      {fmt.filesize_approx_mb > 0 ? `~${fmt.filesize_approx_mb} MB` : 'Stream'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleDownload}
              disabled={isStarting || !selectedFormat}
              className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all relative overflow-hidden group ${
                metadata.serverOffline 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/20'
              }`}
            >
              {isStarting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Preparing Stream...
                  </span>
              ) : (
                  <span className="flex items-center justify-center gap-2">
                    {metadata.serverOffline ? <AlertTriangle className="w-5 h-5"/> : <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />} 
                    {metadata.serverOffline ? 'Backend Offline' : 'Download Now'}
                  </span>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-4">
              By downloading, you accept responsibility for copyright compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;
