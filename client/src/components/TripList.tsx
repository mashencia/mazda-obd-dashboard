import React from 'react';
import useTrips from '../hooks/useTrips';
import { Trip } from '../types'

interface TripListProps {
    onTripSelect: (trip: Trip) => void
}

function TripList({ onTripSelect }: TripListProps) {
    const { loading, trips, error } = useTrips();

    // Loading State
    if(loading) return <div>Loading...</div>;

    // Error State
    if(error) return <div>{error}</div>;

    // Success State
    return (
        <div className ="trip-list">
            {trips.map((trip: Trip) => (
                <div key={trip.tripId} className="trip-item" onClick={() => onTripSelect(trip)}>
                    <div>{new Date(trip.startTime).toLocaleDateString()}</div>
                    <div>RPM {trip.avgRpm.toFixed(1)}</div>
                    <div>{trip.avgVehicleSpeed.toFixed(1)}</div>
                </div>
            ))}
        </div>
    );
}

export default TripList;