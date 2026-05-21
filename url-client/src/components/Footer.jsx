import React from 'react'

const Footer = () => {
  return (
  <footer className="bg-slate-900 px-6 pt-16 pb-8 text-slate-400 font-sans">
    <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row">
      
      {/* Brand Column */}
      <div className="max-w-xs">
        <div className="flex items-center gap-2 text-xl font-extrabold text-white">
          <span className="inline-block -rotate-45 text-xl">✂️</span>
          <span>Shortify</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          Build and protect your brand using powerful, short links that drive conversions.
        </p>
      </div>

      {/* Links Layout */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Solutions</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#shortener" className="transition hover:text-sky-400">URL Shortener</a></li>
            <li><a href="#qr-codes" className="transition hover:text-sky-400">QR Codes</a></li>
            <li><a href="#analytics" className="transition hover:text-sky-400">Analytics</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#about" className="transition hover:text-sky-400">About Us</a></li>
            <li><a href="#pricing" className="transition hover:text-sky-400">Pricing</a></li>
            <li><a href="#careers" className="transition hover:text-sky-400">Careers</a></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Legal</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="#privacy" className="transition hover:text-sky-400">Privacy</a></li>
            <li><a href="#terms" className="transition hover:text-sky-400">Terms</a></li>
            <li><a href="#abuse" className="transition hover:text-sky-400">Report Abuse</a></li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Metadata Bar */}
    <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-6 text-xs flex flex-col gap-3 sm:flex-row sm:justify-between">
      <p>&copy; {new Date().getFullYear()} Shortify Inc. All rights reserved.</p>
      <p className="text-slate-500">Made with &hearts; for a faster web.</p>
    </div>
  </footer>
)
}

export default Footer