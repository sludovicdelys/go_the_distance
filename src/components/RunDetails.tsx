"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getRun, Run } from '../app/services/api';

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Run Details</h1>
            <p><strong>Type:</strong> {run.type}</p>
            <p><strong>Distance:</strong> {run.distance} meters</p>
            <p><strong>Average Speed:</strong> {run.average_speed} km/h</p>
            <p><strong>Running Pace:</strong> {run.running_pace}</p>
            <p><strong>Start Date:</strong> {run.start_date}</p>
            <p><strong>Start Time:</strong> {run.start_time}</p>
            <p><strong>Time:</strong> {run.time}</p>
            <p><strong>Comments:</strong> {run.comments}</p>
            <button onClick={() => router.back()}>Back</button>
        </div>
    );
}

export default RunDetails;