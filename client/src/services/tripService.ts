import axios from 'axios';
import { Trip } from '../types/Trip';
import { Reading } from '../types/Reading';

export const getTrips = async (): Promise<Trip[]> => {
    try {
        const response = await axios.get('http://localhost:8000/trips');
        return response.data;
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

export const getReadings = async (tripId: number): Promise<Reading[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/trips/${tripId}/readings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching readings:', error);
        throw error;
    }
};