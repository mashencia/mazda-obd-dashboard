import React from 'react';
import { Trip } from '../types';

interface TripDetailsProps {
    trip: Trip;
}

function TripDetail({ trip }: TripDetailsProps) {
    const start = new Date(trip.startTime)
    const end = new Date(trip.endTime)
    const durationMs = end.getTime() - start.getTime()
    const durationMin = Math.floor(durationMs / 60000)

    return (
        <div className="trip-details">
            <div className="trip-detail-item">
                <div className = "detail-label">Date</div>
                <div className = "detail-value">{start.toLocaleDateString()}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">RPM</div>
                <div className = "detail-value">{trip.avgRpm}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">SPEED</div>
                <div className = "detail-value">{trip.avgVehicleSpeed}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">Duration</div>
                <div className = "detail-value">{durationMin} minutes</div>
            </div>
        </div>
    )
}

export default TripDetail;