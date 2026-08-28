import axios from 'axios';
import { Trip } from '../types/trip';
import { Reading } from '../types/reading';

const toCamelCase = (key: string): string =>
    key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const camelCaseKeys = <T>(data: any): T => {
    if (Array.isArray(data)) {
        return data.map((item) => camelCaseKeys(item)) as unknown as T;
    }
    if (data !== null && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [toCamelCase(key), camelCaseKeys(value)])
        ) as T;
    }
    return data as T;
};

export const getTrips = async (): Promise<Trip[]> => {
    try {
        const response = await axios.get('http://localhost:8000/trips');
        return camelCaseKeys<Trip[]>(response.data);
    } catch (error) {
        console.error('Error fetching trips:', error);
        throw error;
    }
};

export const getReadings = async (tripId: number): Promise<Reading[]> => {
    try {
        const response = await axios.get(`http://localhost:8000/trips/${tripId}/readings`);
        return camelCaseKeys<Reading[]>(response.data);
    } catch (error) {
        console.error('Error fetching readings:', error);
        throw error;
    }
};