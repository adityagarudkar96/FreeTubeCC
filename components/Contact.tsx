import React from 'react';
import { Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-lg mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Get in touch</h2>
        <p className="text-slate-400">Have a suggestion or found a bug? Let us know.</p>
      </div>

      <form className="glass-card p-8 rounded-3xl space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
          <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 h-32" placeholder="Your message..."></textarea>
        </div>
        <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
          <Send className="w-4 h-4" /> Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
