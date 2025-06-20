import path from 'path';
import fs from 'fs/promises';
import JobForm from '../../../components/JobForm';

interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
}

interface PageProps {
  params: Promise<{ id: string }>; // 👈 key change
}

// Tell Next.js not to prerender this page
export const dynamic = 'force-dynamic';

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params; // ✅ Await the params before using
  const filePath = path.join(process.cwd(), 'data', 'jobs.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const jobs: Job[] = JSON.parse(data);
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return <div className="p-4 text-red-500">Job not found.</div>;
  }

  return <JobForm initialData={job} />;
}
