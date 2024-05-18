import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Run {
    id: number;
    type: string;
    average_speed: number;
    running_pace: string;
    start_date: string;
    start_time: string;
    time: string;
    distance: number;
    comments?: string;
    user: { username: string };
}

export const getRuns = async (): Promise<Run[]> => {
    const response = await axios.get(`${API_URL}/runs`);
    return response.data['hydra:member'];
};

export const getRun = async (id: number): Promise<Run> => {
    try {
        console.log(`Fetching run with ID: ${id}`);
        const response = await axios.get<Run>(`${API_URL}/runs/${id}`);
        console.log('Run data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching run data:', error);
        throw error;
    }
};
