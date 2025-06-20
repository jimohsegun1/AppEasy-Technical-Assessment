import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'data', 'jobs.json');

type Job = {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
};

const readData = (): Job[] => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data: Job[]): void => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const jobs = readData();

  if (req.method === 'PUT') {
    const updatedJobs = jobs.map((job) => job.id === id ? { ...job, ...req.body } : job);
    writeData(updatedJobs);
    return res.status(200).json({ message: 'Updated' });
  }

  if (req.method === 'DELETE') {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    writeData(updatedJobs);
    return res.status(200).json({ message: 'Deleted' });
  }
}