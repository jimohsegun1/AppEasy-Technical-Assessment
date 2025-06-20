// types/index.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  status: 'Applied' | 'Interviewing' | 'Rejected' | 'Offer' | string;
}
