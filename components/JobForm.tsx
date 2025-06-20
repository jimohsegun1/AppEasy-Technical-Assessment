"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addJob, updateJob, Job } from "../lib/api";

export default function JobForm({ initialData }: { initialData?: Job }) {
  const [job, setJob] = useState<Job>(() => {
    if (initialData) return initialData;
    return {
      id: crypto.randomUUID(),
      title: "",
      company: "",
      link: "",
      status: "Applied",
    };
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job.id && initialData) {
      await updateJob(job.id, job);
    } else {
      const { ...jobWithoutId } = job;
      await addJob(jobWithoutId);
    }

    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-100">
          {initialData ? "Edit Job" : "Add New Job"}
        </h1>
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline transition cursor-pointer"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray p-6 rounded shadow-md border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Job Title
          </label>
          <input
            name="title"
            placeholder="e.g., Frontend Developer"
            value={job.title}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Company Name
          </label>
          <input
            name="company"
            placeholder="e.g., TechNova"
            value={job.company}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Application Link
          </label>
          <input
            name="link"
            placeholder="e.g., https://careers.company.com/job"
            value={job.link}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Status
          </label>
          <select
            name="status"
            value={job.status}
            onChange={handleChange}
            className="mt-1 w-full border rounded bg-gray-950 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {["Applied", "Interviewing", "Rejected", "Offer"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition cursor-pointer"
        >
          {initialData ? "Update Job" : "Add Job"}
        </button>
      </form>
    </div>
  );
}
