"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getRun, Run } from '../app/services/apiService';

const RunDetails: React.FC = () => {
    const [run, setRun] = useState<Run | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const fetchRun = async () => {
            if (id) {
                try {
                    const runId = parseInt(id as string, 10);
                    if (isNaN(runId)) {
                        throw new Error('Invalid ID format.');
                    }
                    const data = await getRun(runId);
                    setRun(data);
                    setError(null); // Clear previous error
                } catch (error) {
                    console.error('Failed to fetch run:', error);
                    setError('Failed to fetch run details. Please try again later.');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Run ID is missing.');
                setLoading(false);
            }
        };

        fetchRun();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!run) {
        return <div>No run details found.</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Run Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.type}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distance</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.distance} meters</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Average Speed</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.average_speed} km/h</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Running Pace</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.running_pace}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.start_date}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.start_time}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.time}</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Comments</label>
                        <p className="mt-1 text-lg bg-gray-100 p-2 rounded-md">{run.comments}</p>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                <button 
                    onClick={() => router.back()} 
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
                    aria-label="Go back to the previous page"
                >
                    Back
                </button>
                </div>
            </div>
        </div>
    );
}

export default RunDetails;