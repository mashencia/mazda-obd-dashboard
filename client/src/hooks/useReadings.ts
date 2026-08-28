import { useState, useEffect } from 'react';
import { Reading } from '../types';
import { getReadings } from '../services/tripService';

const useReadings = (tripId: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [readings, setReadings] = useState<Reading[]>([]);
   const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    if (!tripId) return
    const fetchReadings = async () => {
        try {
            const tripsData = await getReadings(tripId); 
            setReadings(tripsData);
        } catch (err) {
            setError('Error fetching readings');
        } finally {
            setLoading(false);
        }
    };

    fetchReadings();
    }, [tripId]);

    return { loading, readings, error };
}

export default useReadings
