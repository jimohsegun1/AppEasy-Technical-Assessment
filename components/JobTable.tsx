'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteJob, getJobs, Job } from '../lib/api';

export default function JobTable() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const getStatusBadge = (status: Job['status']) => {
    const base = 'px-2 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case 'Applied':
        return `${base} bg-blue-100 text-blue-600`;
      case 'Interviewing':
        return `${base} bg-yellow-100 text-yellow-700`;
      case 'Offer':
        return `${base} bg-green-100 text-green-700`;
      case 'Rejected':
        return `${base} bg-red-100 text-red-600`;
      default:
        return `${base} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-300">Job Applications</h1>
        <Link
          href="/add-job"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          + Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border rounded bg-gray-50">
          No job applications yet. Add one to get started!
        </div>
      ) : (
        <div className="overflow-x-auto border rounded shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 font-medium text-gray-400">{job.title}</td>
                  <td className="px-6 py-4 text-gray-400">{job.company}</td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(job.status)}>{job.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/edit-job/${job.id}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-500 hover:text-red-700 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
