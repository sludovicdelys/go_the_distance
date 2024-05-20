'use client';

import { useEffect, useState } from 'react';
import { deleteRun, getRuns, Run, loadCredentials } from '../services/apiService';
import RunActions from '../../components/RunActions';
import Link from 'next/link';
import withAuth from '../../components/withAuth';

const Home: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      loadCredentials();
      fetchRuns();
    }
  }, []);

  const fetchRuns = async () => {
    try {
      const data = await getRuns();
      setRuns(data);
    } catch (error) {
      console.error('Error fetching runs:', error);
    }
  };

  const handleDeleteRun = async (id: number) => {
    try {
      await deleteRun(id);
      setRuns(runs.filter(run => run.id !== id));
    } catch (error) {
      console.error('Error deleting run:', error);
    }
  };

  const handleEditRun = (id: number) => {
    // Redirect to edit run page
    window.location.href = `/runs/${id}/edit`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">List of Runs</h2>
          <div className="mb-8">
            <Link href="/runs/create" className="mb-8 flex justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Create New Run
            </Link>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full shadow-lg rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Average Speed</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Running Pace</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                    <th className="py-4 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {runs.map((run) => (
                    <tr key={run.id} className="hover:bg-gray-100 transition duration-150">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{run.id}</td>
                      <td className="py-4 px-6 text-sm text-green-700 hover:text-green-900 transition duration-150">
                        <a href={`/runs/${run.id}`}>{run.user.username}</a>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{run.type}</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.average_speed} km/h</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.running_pace} min/km</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.start_date}</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.start_time}</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.time}</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.distance} km</td>
                      <td className="py-4 px-6 text-sm text-center text-gray-500">{run.comments}</td>
                      <RunActions runId={run.id} onEdit={handleEditRun} onDelete={handleDeleteRun} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default withAuth(Home);