// import fs from 'fs';
// import path from 'path';
// import JobForm from '../../../components/JobForm';

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   link: string;
//   status: string;
// }

// export default async function EditJobPage({ params }: { params: { id: string } }) {
//   const filePath = path.join(process.cwd(), 'data', 'jobs.json');
//   const jobs: Job[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//   const job = jobs.find((j) => j.id === params.id);

//   return <JobForm initialData={job} />;
// }


import fs from 'fs';
import path from 'path';
import { Job } from '../../../lib/api';
import JobForm from '../../../components/JobForm';

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
    // You might want to throw a 404 or redirect
    return <div className="text-red-500 p-4">Job not found.</div>;
  }

  return <JobForm initialData={job} />;
}
