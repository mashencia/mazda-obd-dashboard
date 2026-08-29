import React from 'react';
import useTrips from '../hooks/useTrips';
import { Trip } from '../types'
import './TripList.css'

interface TripListProps {
    selectedTripId?: number;
    onTripSelect: (trip: Trip) => void
}

function getDurationMinutes(trip: Trip): number {
    const start = new Date(trip.startTime + 'Z')
    const end = new Date(trip.endTime + 'Z')
    return Math.floor((end.getTime() - start.getTime()) / 60000)
}

function TripList({ selectedTripId, onTripSelect }: TripListProps) {
    const { loading, trips, error } = useTrips();

    return (
        <div className="trip-panel">
            <div className="panel-header">
                <div className="panel-label">Trips</div>
                <div className="trip-count">{trips.length} recorded</div>
            </div>

            {loading && <div className="trip-list-message">Loading...</div>}
            {error && <div className="trip-list-message">{error}</div>}

            {!loading && !error && (
                <div className="trip-list">
                    {trips.map((trip: Trip) => (
                        <div
                            key={trip.tripId}
                            className={`trip-item ${trip.tripId === selectedTripId ? 'active' : ''}`}
                            onClick={() => onTripSelect(trip)}
                        >
                            <div className="trip-row-1">
                                <div className="trip-date">{new Date(trip.startTime + 'Z').toLocaleDateString()}</div>
                                <div className="health-circle circle-green"></div>
                            </div>
                            <div className="trip-row-2">
                                <span>{getDurationMinutes(trip)} min</span>
                            </div>
                            <div className="trip-row-3">
                                <span>{trip.avgRpm.toFixed(0)} RPM</span>
                                <span>{trip.avgVehicleSpeed.toFixed(1)} km/h</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TripList;
