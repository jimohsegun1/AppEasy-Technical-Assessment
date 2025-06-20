import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
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
  if (req.method === 'GET') {
    return res.status(200).json(readData());
  }

  if (req.method === 'POST') {
    const jobs = readData();
    const newJob: Job = { ...req.body, id: uuidv4() };
    jobs.push(newJob);
    writeData(jobs);
    return res.status(201).json(newJob);
  }
}