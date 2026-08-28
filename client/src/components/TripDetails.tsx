import React from 'react';
import { Trip } from '../types';

interface TripDetailsProps {
    trip: Trip;
}

function TripDetail({ trip }: TripDetailsProps) {
    const start = new Date(trip.startTime + 'Z')
    const end = new Date(trip.endTime + 'Z')
    const durationMs = end.getTime() - start.getTime()
    const durationMin = Math.floor(durationMs / 60000)
    console.log('startTime:', trip.startTime)
    return (
        <div className="trip-details">
            <div className="trip-detail-item">
                <div className = "detail-label">Date</div>
                <div className = "detail-value">{start.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">RPM</div>
                <div className = "detail-value">{trip.avgRpm.toFixed(1)}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">SPEED</div>
                <div className = "detail-value">{trip.avgVehicleSpeed.toFixed(1)}</div>
            </div>
            <div className="trip-detail-item">
                <div className = "detail-label">Duration</div>
                <div className = "detail-value">{durationMin} minutes</div>
            </div>
        </div>
    )
}

export default TripDetail;