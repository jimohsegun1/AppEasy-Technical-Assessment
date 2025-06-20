"use client";
import { useEffect, useState } from "react";
import JobForm from "../../../components/JobForm";
import { Job, getJobs } from "../../../lib/api";
import { useParams } from "next/navigation";

export default function EditJobPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      const { data } = await getJobs();
      const found = data.find((j) => j.id === id);
      setJob(found ?? null);
    };
    loadJob();
  }, [id]);

  if (!job) {
    return <div className="p-4 text-red-500">Job not found.</div>;
  }

  return <JobForm initialData={job} />;
}
