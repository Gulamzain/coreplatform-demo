// src/app/dashboard/reports/page.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiCalendar, BiDownload, BiFile, BiTime, BiTrendingUp } from 'react-icons/bi';

const reports = [
  { id: 1, name: 'Daily Trading Report', date: '2024-03-15', type: 'PDF', size: '245 KB' },
  { id: 2, name: 'Weekly Summary', date: '2024-03-10', type: 'PDF', size: '512 KB' },
  { id: 3, name: 'Monthly Performance', date: '2024-03-01', type: 'Excel', size: '1.2 MB' },
  { id: 4, name: 'Quarterly Analysis', date: '2024-01-01', type: 'PDF', size: '2.1 MB' },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} report from ${startDate} to ${endDate}`);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Reports</h1>
        <p>Generate and download trading reports</p>
      </div>

      <div className="generate-section">
        <h3>Generate New Report</h3>
        <div className="generate-form">
          <div className="form-group">
            <label>Report Type</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="yearly">Yearly Report</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button className="generate-btn" onClick={handleGenerateReport}><BiTrendingUp size={16} /> Generate Report</button>
        </div>
      </div>

      <div className="reports-list">
        <h3>Saved Reports</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Report Name</th><th>Date</th><th>Type</th><th>Size</th><th>Action</th></tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <motion.tr key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                  <td><BiFile size={16} /> {report.name}</td>
                  <td><BiCalendar size={14} /> {report.date}</td>
                  <td>{report.type}</td>
                  <td>{report.size}</td>
                  <td><button className="download-report"><BiDownload size={16} /> Download</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .reports-page { max-width: 1000px; margin: 0 auto; }
        .page-header { margin-bottom: 32px; }
        .page-header h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .page-header p { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }

        .generate-section { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px; margin-bottom: 32px; }
        .generate-section h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .generate-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; align-items: end; }
        .form-group label { display: block; font-size: 13px; color: var(--text-secondary); margin-bottom: 6px; }
        .form-group select, .form-group input { width: 100%; padding: 10px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); }
        .generate-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; background: linear-gradient(135deg, #3fcb1b, #2e9c14); color: white; border: none; border-radius: 10px; cursor: pointer; }

        .reports-list h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 0 0 20px; }
        .table-container { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border-color); }
        th { color: var(--text-secondary); font-weight: 500; font-size: 13px; }
        td { color: var(--text-primary); }
        td:first-child { display: flex; align-items: center; gap: 8px; }
        .download-report { display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: rgba(63,203,27,0.1); border: none; border-radius: 8px; color: #3fcb1b; cursor: pointer; }
      `}</style>
    </div>
  );
}