'use client';
import { useEffect } from 'react';
import JobTable from '../components/JobTable';
import AnalyzeJob from '../components/AnalyzeJob';
import jobSeed from '../data/jobs.json'; 
import { getJobs } from '../lib/api';

export default function HomePage() {
  useEffect(() => {
    const syncLocalStorage = async () => {
      const existing = await getJobs();
      if (existing.data.length === 0) {
        localStorage.setItem('job-tracker-data', JSON.stringify(jobSeed));
      }
    };
    syncLocalStorage();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mini Job Tracker</h1>
      <AnalyzeJob />
      <JobTable />
    </main>
  );
}
