import React from 'react';
import { AppView } from '../types';
import { Video, HelpCircle, Mail, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItemClass = (view: AppView) => 
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      currentView === view 
        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
        : 'hover:bg-slate-800 text-slate-400 hover:text-white'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setView(AppView.HOME)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <Video className="w-8 h-8 text-cyan-400 relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            FreeTube<span className="text-cyan-400">CC</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className={navItemClass(AppView.HOME)} onClick={() => setView(AppView.HOME)}>
            <ShieldCheck className="w-4 h-4" />
            Home
          </button>
          <button className={navItemClass(AppView.FAQ)} onClick={() => setView(AppView.FAQ)}>
            <HelpCircle className="w-4 h-4" />
            FAQ
          </button>
          <button className={navItemClass(AppView.CONTACT)} onClick={() => setView(AppView.CONTACT)}>
            <Mail className="w-4 h-4" />
            Contact
          </button>
        </div>

        <div className="md:hidden">
          {/* Mobile menu placeholder - simplifying for this demo */}
          <button onClick={() => setView(AppView.FAQ)} className="p-2 text-slate-300">
            <HelpCircle />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
