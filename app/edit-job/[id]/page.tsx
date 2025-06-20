import fs from 'fs';
import path from 'path';
import JobForm from '../../../components/JobForm';

export default async function EditJobPage({ params }: any) {
  const filePath = path.join(process.cwd(), 'data', 'jobs.json');
  const jobs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const job = jobs.find(async (j: any) => j.id === (await params).id);
  return <JobForm initialData={job} />;
}