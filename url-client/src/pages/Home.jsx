import React,{useEffect, useState} from 'react'
import axios from "axios"
import Login from "./Login"
import {useSelector} from "react-redux"
import DecodeForm from '../components/DecodeForm'
import EncodeForm from "../components/EncodeForm"
import FormatURL from "../components/FormatURL"

const Home = () => {

  const isLogin = useSelector((state)=>state.auth.status)

  const [urls, setUrls] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleExportCSV = () => {
    const BOM = '\uFEFF'; // Excel UTF-8 BOM — prevents garbled characters

    const escape = (value) => {
      const str = String(value ?? '');
      // Wrap in quotes if it contains a comma, quote, or newline
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

    const headers = ['Original URL', 'Short Code', 'Created At'];

    const rows = urls.map((url) => [
      escape(url.redirectUrl),
      escape(url.shortId),
      escape(formatDate(url.createdAt)),
    ]);

    const csvContent =
      BOM +
      [headers.map(escape).join(','), ...rows.map((r) => r.join(','))].join('\r\n'); // \r\n is the RFC 4180 line ending for CSV

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `shortify_urls_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl); // free memory
    setIsDropdownOpen(false);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');

    const dateRange = (() => {
      if (!urls.length) return '—';
      const dates = urls.map(u => new Date(u.createdAt));
      const min = new Date(Math.min(...dates));
      const max = new Date(Math.max(...dates));
      const fmt = d => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      return min.getMonth() === max.getMonth() && min.getFullYear() === max.getFullYear()
        ? fmt(min)
        : `${fmt(min)} – ${fmt(max)}`;
    })();

    const tableRows = urls.map(url => `
      <tr>
        <td class="url">${url.redirectUrl}</td>
        <td class="code">${url.shortId}</td>
        <td class="date">${new Date(url.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Shortify – URL Analytics Export</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 48px; color: #0f172a; font-size: 14px; line-height: 1.5; }

            .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 2px solid #4f46e5; margin-bottom: 28px; }
            .brand { font-size: 22px; font-weight: 600; color: #4f46e5; letter-spacing: -0.5px; }
            .brand-sub { font-size: 13px; color: #64748b; font-weight: 400; margin-top: 3px; }
            .meta { text-align: right; font-size: 12px; color: #64748b; line-height: 1.8; }

            .stats { display: flex; gap: 12px; margin-bottom: 28px; }
            .stat { flex: 1; background: #f8fafc; border-radius: 8px; padding: 14px 18px; }
            .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: #94a3b8; margin-bottom: 4px; }
            .stat-value { font-size: 22px; font-weight: 600; color: #0f172a; }

            .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: #94a3b8; margin-bottom: 10px; }

            table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            thead th { padding: 9px 12px; background: #f1f5f9; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; text-align: left; border-bottom: 1px solid #e2e8f0; }
            thead th:first-child { border-radius: 6px 0 0 6px; width: 60%; }
            thead th:last-child { border-radius: 0 6px 6px 0; }
            tbody tr:last-child td { border-bottom: none; }
            tbody td { padding: 11px 12px; border-bottom: 1px solid #f1f5f9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; vertical-align: middle; }
            td.url { color: #64748b; }
            td.code { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; color: #4f46e5; font-weight: 600; }
            td.date { color: #94a3b8; font-size: 12px; }

            .footer { margin-top: 32px; padding-top: 14px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }

            @media print {
              body { padding: 0; }
              @page { margin: 2cm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Shortify</div>
              <div class="brand-sub">URL Analytics Export</div>
            </div>
            <div class="meta">
              Generated ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}<br>
              ${urls.length} link${urls.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-label">Total links</div>
              <div class="stat-value">${urls.length.toLocaleString()}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Date range</div>
              <div class="stat-value" style="font-size:15px; padding-top:4px">${dateRange}</div>
            </div>
          </div>

          <div class="section-label">Shortened links</div>
          <table>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short code</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>

          <div class="footer">
            <span>Shortify &mdash; shortify.io</span>
            <span>Exported ${new Date().toLocaleDateString()}</span>
          </div>

          <script>window.onload = function() { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);

    printWindow.document.close();
    setIsDropdownOpen(false);
  };

  useEffect(()=>{
    if(isLogin || refresh){
      axios.get("/user/getUrls")
      .then((response)=>{
        setUrls(response.data)
        setRefresh(false)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }, [isLogin, refresh])

  return (
    <div>
      {!isLogin && <Login />}

      {isLogin && (
        <div>
          <EncodeForm />
          <DecodeForm />
          
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans sm:text-2xl">
                All URLs created by <span className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 to-blue-600">you</span>
              </h1>
              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Manage, copy, and track the analytics of your shortened links.
              </p>
            </div>

            {/* Combined Buttons Wrapper Element */}
            <div className="flex items-center gap-2 self-start sm:self-center relative">
              
              {/* Export Custom Dropdown Component */}
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 sm:text-sm"
                >
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  EXPORT
                  <svg className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Menu Layer */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop click closer overlay handler */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    
                    <div className="absolute left-0 mt-2 w-40 origin-top-left rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-20">
                      <button
                        onClick={handleExportCSV}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600 sm:text-sm"
                      >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                        Export as CSV
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600 sm:text-sm"
                      >
                        <span className="flex h-2 w-2 rounded-full bg-rose-500" />
                        Export as PDF
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Your original REFRESH action Button */}
              <button 
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow active:scale-95 sm:text-sm" 
                onClick={() => setRefresh(true)}
              >
                REFRESH
              </button>
            </div>
          </div>

          {urls.map((url) => (
            <FormatURL 
              key={url._id} 
              originalUrl={url.redirectUrl} 
              shortUrl={url.shortId} 
              createdAt={url.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home