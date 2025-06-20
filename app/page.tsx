import JobTable from '../components/JobTable';
import AnalyzeJob from '../components/AnalyzeJob';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mini Job Tracker</h1>
      <AnalyzeJob />
      <JobTable />
    </main>
  );
}