import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoResult from './components/VideoResult';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalAssistant from './components/LegalAssistant';
import { fetchVideoInfo } from './services/mockBackend';
import { VideoMetadata, AppView } from './types';

function App() {
  const [currentView, setView] = useState<AppView>(AppView.HOME);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoMetadata | null>(null);

  const handleSearch = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const data = await fetchVideoInfo(url);
      setVideoData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch video info");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setVideoData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 bg-slate-950">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <Navbar currentView={currentView} setView={(view) => {
        setView(view);
        handleReset();
      }} />

      <main className="flex-grow">
        {currentView === AppView.HOME && (
          <>
            {!videoData ? (
              <Hero onSearch={handleSearch} isLoading={isLoading} error={error} />
            ) : (
              <VideoResult metadata={videoData} onReset={handleReset} />
            )}
          </>
        )}

        {currentView === AppView.FAQ && <FAQ />}
        {currentView === AppView.CONTACT && <Contact />}
      </main>

      <LegalAssistant />
      <Footer />
    </div>
  );
}

export default App;
