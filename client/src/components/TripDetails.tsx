import React from 'react';
import { Trip } from '../types';
import useReadings from '../hooks/useReadings';
import HealthIndicator from './HealthIndicator';
import './TripDetails.css'

interface TripDetailsProps {
    trip: Trip;
    healthStatus?: "green" | "yellow" | "red";
}

function TripDetail({ trip, healthStatus = "green" }: TripDetailsProps) {
    const start = new Date(trip.startTime + 'Z')
    const end = new Date(trip.endTime + 'Z')
    const { readings } = useReadings(trip.tripId)
    const durationMs = end.getTime() - start.getTime()
    const durationMin = Math.floor(durationMs / 60000)
    const durationSec = Math.floor((durationMs % 60000) / 1000)

    return (
        <div className="detail-strip">
            <div className="detail-block">
                <div className="detail-label">Date</div>
                <div className="detail-val">{start.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            <div className="sep"></div>
            <div className="detail-block">
                <div className="detail-label">Duration</div>
                <div className="detail-val">{durationMin}m {durationSec.toString().padStart(2, '0')}s</div>
            </div>
            <div className="sep"></div>
            <div className="detail-block">
                <div className="detail-label">Readings</div>
                <div className="detail-val">{readings.length}</div>
            </div>
            <div className="sep"></div>
            <div className="detail-block">
                <div className="detail-label">Avg Speed</div>
                <div className="detail-val">{trip.avgVehicleSpeed.toFixed(1)} km/h</div>
            </div>
            <div className="sep"></div>
            <div className="detail-block">
                <div className="detail-label">Avg RPM</div>
                <div className="detail-val">{Math.round(trip.avgRpm).toLocaleString()}</div>
            </div>
            <div className="health-group">
                <div className="health-label-text">Engine Health</div>
                <HealthIndicator healthStatus={healthStatus} />
            </div>
        </div>
    )
}

export default TripDetail;
