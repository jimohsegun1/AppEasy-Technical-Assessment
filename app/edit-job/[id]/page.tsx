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

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'jobs.json');
  const jobs: Job[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const job = jobs.find((j) => j.id === params.id);

  return <JobForm initialData={job} />;
}
