import axios from 'axios';

const API_URL = '/api/jobs';

export const getJobs = () => axios.get(API_URL);
export const addJob = (job: any) => axios.post(API_URL, job);
export const updateJob = (id: string, job: any) => axios.put(`${API_URL}/${id}`, job);
export const deleteJob = (id: string) => axios.delete(`${API_URL}/${id}`);