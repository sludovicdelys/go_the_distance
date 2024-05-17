import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRun, Run } from '../../services/api';

const RunDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [run, setRun] = useState<Run | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRun = async () => {
                try {
                    const data = await getRun(Number(id));
                    setRun(data);
                } catch (error) {
                    console.error('Failed to fetch run:', error);
                }
            };

            fetchRun();
        }
    }, [id]);

    if (!run) {
        return <div>Loading...</div>;
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
        </div>
    );
}

export default RunDetails;