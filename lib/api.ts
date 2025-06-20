import axios from 'axios';

export interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  status: string;
}

const API_URL = '/api/jobs';

export const getJobs = (): Promise<{ data: Job[] }> => axios.get(API_URL);

export const addJob = (job: Omit<Job, 'id'>): Promise<{ data: Job }> =>
  axios.post(API_URL, job);

export const updateJob = (id: string, job: Job): Promise<{ data: Job }> =>
  axios.put(`${API_URL}/${id}`, job);

export const deleteJob = (id: string): Promise<{ data: { message: string } }> =>
  axios.delete(`${API_URL}/${id}`);
