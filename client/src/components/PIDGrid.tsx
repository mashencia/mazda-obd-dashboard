import React from 'react';
import PIDTile from './PIDTile';
import useReadings from '../hooks/useReadings';
import type { Reading } from '../types';
import './PIDGrid.css'

interface PIDGridProps {
    tripId: number;
}

const SPARKLINE_POINTS = 20;

function PIDGrid({ tripId }: PIDGridProps) {
    const { loading, readings, error } = useReadings(tripId);

    const pids: { key: keyof Reading; label: string; unit: string }[] = [
        { key: 'rpm', label: 'RPM', unit: 'rev/min' },
        { key: 'vehicleSpeed', label: 'Vehicle Speed', unit: 'km/h' },
        { key: 'ect', label: 'Coolant Temp', unit: '°C' },
        { key: 'maf', label: 'MAF', unit: 'g/s' },
        { key: 'mapKpa', label: 'MAP', unit: 'kPa' },
        { key: 'throttlePosition', label: 'Throttle', unit: '%' },
        { key: 'o2Sensor', label: 'O2 Sensor', unit: 'V' },
        { key: 'fuelTrim', label: 'Fuel Trim', unit: '%' },
        { key: 'ignitionTimingAdvance', label: 'Ignition Advance', unit: '° BTC' },
        { key: 'iat', label: 'Intake Air Temp', unit: '°C' },
    ]

    // Loading State
    if (loading) return <div className="pid-grid-message">Loading...</div>;

    // Error State
    if (error) return <div className="pid-grid-message">{error}</div>;

    // Success State
    return (
        <div className="pid-grid">
            {pids.map((pid) => {
                const values = readings.map((r) => Number(r[pid.key]) || 0)
                const avg = values.length === 0 ? 0 : values.reduce((sum, v) => sum + v, 0) / values.length

                return (
                    <PIDTile
                        key={String(pid.key)}
                        label={pid.label}
                        unit={pid.unit}
                        value={avg}
                        status="green"
                        sparkline={values.slice(-SPARKLINE_POINTS)}
                    />
                )
            })}
        </div>
    );
}

export default PIDGrid;
