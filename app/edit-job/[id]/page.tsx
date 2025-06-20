import fs from 'fs';
import path from 'path';
import JobForm from '../../../components/JobForm';

interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditJobPage({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'data', 'jobs.json');
  const jobs: Job[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return (
      <div className="p-4 text-red-500">
        Job not found.
      </div>
    );
  }

  return <JobForm initialData={job} />;
}
