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
    user: string; // This would typically be the IRI of the user
}

export const getRuns = async (): Promise<Run[]> => {
    const response = await axios.get(`${API_URL}/runs`);
    return response.data['hydra:member'];
};

export const getRun = async (id: number): Promise<Run> => {
    const response = await axios.get(`${API_URL}/runs/${id}`);
    return response.data;
};
