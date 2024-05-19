import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create an axios instance with the base URL and authentication
const axiosInstance = axios.create({
    baseURL: API_URL,
    auth: {
        username: 'runner', // Use the actual username
        password: 'secret'  // Use the actual password
    },
    headers: {
        'Content-Type': 'application/json', // Default content type for all requests
        'Accept': 'application/ld+json',   // Accept type for all requests
    }
});

// Define the Run interface
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

// Function to handle API errors
const handleApiError = (error: any) => {
    console.error('API call error:', error);
    throw error;
};

// Function to set up authentication
const setupAuth = (username: string, password: string) => {
    axiosInstance.defaults.auth = {
        username,
        password
    };
};

// Function to login and store credentials securely
export const login = async (username: string, password: string): Promise<void> => {
    try {
        // Make a test request to verify credentials
        await axiosInstance.get('/runs', {
            auth: {
                username,
                password
            }
        });

        // If the request is successful, set up the authentication for future requests
        setupAuth(username, password);

        // Store credentials securely in session storage
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('auth', btoa(`${username}:${password}`));
        }
    } catch (error) {
        handleApiError(error);
        throw new Error('Invalid credentials');
    }
};

// Function to load credentials from session storage
export const loadCredentials = () => {
    if (typeof window !== 'undefined') {
        const auth = sessionStorage.getItem('auth');
        if (auth) {
            const [username, password] = atob(auth).split(':');
            setupAuth(username, password);
        }
    }
};

// Load credentials when the module is loaded (client-side only)
if (typeof window !== 'undefined') {
    loadCredentials();
}

// Function to get all runs
export const getRuns = async (): Promise<Run[]> => {
    try {
        const response = await axiosInstance.get('/runs');
        return response.data['hydra:member'];
    } catch (error) {
        handleApiError(error);
        return []; // Return an empty array or handle the error appropriately
    }
};

// Function to get a single run by ID
export const getRun = async (id: number): Promise<Run> => {
    try {
        const response = await axiosInstance.get<Run>(`/runs/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error; // Ensure the function throws an error to satisfy TypeScript's expectations
    }
};

// Function to create a new run
export const createRun = async (runData: Partial<Run>): Promise<Run> => {
    try {
        const response = await axiosInstance.post('/runs', runData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error; // Ensure the function throws an error to satisfy TypeScript's expectations
    }
};

// Function to update an existing run
export const updateRun = async (id: number, runData: Partial<Run>): Promise<Run> => {
    try {
        const response = await axiosInstance.put(`/runs/${id}`, runData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error; // Ensure the function throws an error to satisfy TypeScript's expectations
    }
};

// Function to delete a run
export const deleteRun = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/runs/${id}`);
    } catch (error) {
        handleApiError(error);
        throw error; // Ensure the function throws an error to satisfy TypeScript's expectations
    }
};