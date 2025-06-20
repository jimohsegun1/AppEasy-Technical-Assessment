import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'jobs.json');
const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data: any) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req: any, res: any) {
  const { id } = req.query;
  const jobs = readData();

  if (req.method === 'PUT') {
    const updatedJobs = jobs.map((job: any) => job.id === id ? { ...job, ...req.body } : job);
    writeData(updatedJobs);
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const updatedJobs = jobs.filter((job: any) => job.id !== id);
    writeData(updatedJobs);
    return res.status(200).json({ message: 'Deleted' });
  }
}