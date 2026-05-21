import React, { useState } from 'react';

const UrlCard = ({originalUrl, shortUrl, createdAt}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://url-shortener-backend-l35c.onrender.com/url/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Side: URL Info Layout */}
        <div className="flex flex-1 items-start gap-3 min-w-0">
          {/* Decorative Icon Wrapper */}
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            {/* Clickable Short URL */}
            <a 
              href={`https://url-shortener-backend-l35c.onrender.com/url/${shortUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-bold text-slate-900 transition-colors hover:text-indigo-600 break-all"
            >
              {`https://url-shortener-backend-l35c.onrender.com/url/${shortUrl}`}
              <svg className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Original Long URL */}
            <p className="mt-1 text-sm text-slate-400 font-medium truncate max-w-md md:max-w-xl" title={originalUrl}>
              {originalUrl}
            </p>

            {/* Meta Information Badge Container */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{createdAt && new Date(createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stats & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0">
          
          {/* Improved Click Counter Badge */}
          {/* <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-1.5 border border-slate-200/60 transition-colors group-hover:bg-indigo-50/30 group-hover:border-indigo-100">
            <svg className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-bold text-slate-700">
              {clicks} <span className="font-medium text-slate-500">{clicks === 1 ? 'click' : 'clicks'}</span>
            </span>
          </div> */}

          <div className="flex items-center gap-2">
            {/* Copy Action Button */}
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-[0.97] ${
                copied 
                  ? "bg-emerald-500 text-white shadow-emerald-500/10" 
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10"
              }`}
            >
              {copied ? (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;