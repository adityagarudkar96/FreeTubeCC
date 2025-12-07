import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "What is Creative Commons?",
      a: "Creative Commons licenses give a standard way for content creators to grant someone else permission to use their work. YouTube allows creators to mark their videos with a CC BY license."
    },
    {
      q: "Why can't I download copyrighted videos?",
      a: "Downloading copyrighted material without permission breaches YouTube's Terms of Service and copyright laws. Our tool is designed to respect these boundaries and protect users from legal issues."
    },
    {
      q: "Is this tool free?",
      a: "Yes, FreeTube CC Downloader is completely free to use. We do not charge for high-quality downloads or format conversions."
    },
    {
      q: "How do I know if a video is safe?",
      a: "Our system automatically checks the license type of the video metadata. If it's not Creative Commons or user-owned (verified via channel match), we block the download."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Frequently Asked Questions</h2>
      <p className="text-slate-400 text-center mb-12">Everything you need to know about safe downloading.</p>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <details key={idx} className="group glass-card rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden open:bg-slate-800/80 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <h3 className="text-lg font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                {item.q}
              </h3>
              <span className="transition-transform group-open:rotate-180">
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </span>
            </summary>
            <div className="mt-4 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
