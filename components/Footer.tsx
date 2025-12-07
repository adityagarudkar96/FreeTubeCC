import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-10 border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-slate-400 mb-4">
          FreeTube CC Downloader is a tool strictly for <span className="text-cyan-400 font-medium">Creative Commons</span> and user-owned content.
        </p>
        <div className="flex justify-center gap-6 text-sm text-slate-500 mb-8">
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">DMCA</a>
        </div>
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} FreeTube CC. We do not support piracy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
