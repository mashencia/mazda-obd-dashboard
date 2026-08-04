import { useState, useEffect } from 'react';
import { Trip } from '../types';
import { getTrips } from '../services/tripService';

const useTrips = () => {
   const [loading, setLoading] = useState<boolean>(true);
   const [trips, setTrips] = useState<Trip[]>([]);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchTrips = async () => {
        try {
            const tripsData = await getTrips(); 
            setTrips(tripsData);
        } catch (err) {
            setError('Error fetching trips');
        } finally {
            setLoading(false);
        }
    };

    fetchTrips();
    }, []);

    return { loading, trips, error };
}

export default useTrips