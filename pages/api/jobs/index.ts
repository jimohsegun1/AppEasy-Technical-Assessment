import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'data', 'jobs.json');
const readData = () => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeData = (data: any) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json(readData());
  }
  if (req.method === 'POST') {
    const jobs = readData();
    const newJob = { ...req.body, id: uuidv4() };
    jobs.push(newJob);
    writeData(jobs);
    return res.status(201).json(newJob);
  }
}