import React from 'react';
import PIDTile from './PIDTile';
import useReadings from '../hooks/useReadings';
import type { Reading } from '../types';

interface PIDGridProps {
    tripId: number;
}

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
    if (loading) return <div>Loading...</div>;

    // Error State
    if (error) return <div>{error}</div>;

    // Success State
    return (
        <div className="tile-grid">
            {pids.map((pid) => {
                const avg = readings.length === 0 ? 0 : readings.reduce((sum, r) =>
                    sum + (Number(r[pid.key]) || 0), 0
                ) / readings.length

                return (
                    <PIDTile
                        key={String(pid.key)}
                        label={pid.label}
                        unit={pid.unit}
                        value={avg}
                        status="green"
                    />
                )
            })}
        </div>
    );
}

export default PIDGrid;