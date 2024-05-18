"use client";
import { useEffect, useState } from 'react';
import { getRuns, Run } from './services/api';
import Link from 'next/link';
import RunActions from '../components/RunActions';

const Home = () => {
    const [runs, setRuns] = useState<Run[]>([]);

    useEffect(() => {
        const fetchRuns = async () => {
            try {
                const data = await getRuns();
                setRuns(data);
            } catch (error) {
                console.error('Failed to fetch runs:', error);
            }
        };

        fetchRuns();
    }, []);

    const handleEdit = (runId: number) => {
      console.log(`Edit run with id: ${runId}`);
      // Add your edit logic here
    };
  
    const handleDelete = (runId: number) => {
      console.log(`Delete run with id: ${runId}`);
      // Add your delete logic here
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight">List of Runs</h2>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Username</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Average Speed</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Running Pace</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Start Date</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Start Time</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Time</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Distance</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Comments</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {runs.map(run => (
                            <tr key={run.id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">{run.id}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-purple-900 hover:text-gray-900">
                                <Link href={`/runs/${run.id}`}>
                                    {run.user.username}
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.type}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.average_speed}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.running_pace}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.start_date}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.start_time}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.time}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.distance}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm">{run.comments}</td>
                              <RunActions runId={run.id} onEdit={handleEdit} onDelete={handleDelete} />
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

export default Home;