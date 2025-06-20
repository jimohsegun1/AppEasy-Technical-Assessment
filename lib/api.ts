// lib/api.ts

export interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
}

const STORAGE_KEY = 'job-tracker-data';

export const getJobs = async (): Promise<{ data: Job[] }> => {
  if (typeof window === 'undefined') return { data: [] };
  const stored = localStorage.getItem(STORAGE_KEY);
  const jobs = stored ? JSON.parse(stored) : [];
  return { data: jobs };
};

export const addJob = async (job: Omit<Job, 'id'>): Promise<{ data: Job }> => {
  const { data: jobs } = await getJobs();
  const newJob: Job = { ...job, id: crypto.randomUUID() };
  const updated = [...jobs, newJob];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: newJob };
};

export const updateJob = async (id: string, job: Job): Promise<{ data: Job }> => {
  const { data: jobs } = await getJobs();
  const updated = jobs.map((j) => (j.id === id ? job : j));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { data: job };
};

export const deleteJob = async (id: string): Promise<{ data: { message: string } }> => {
  const { data: jobs } = await getJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { data: { message: 'Deleted' } };
};
