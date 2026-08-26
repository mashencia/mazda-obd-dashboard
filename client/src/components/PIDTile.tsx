import React from 'react';

interface PIDTileProps {
    label: string;
    value: number | null;
    unit: string;
    status: "green" | "yellow" | "red";
}

function PIDTile({ label, value, unit, status }: PIDTileProps) {
    return (
        <div className="pid-tile">
            <div className="pid-tile-item">
                <div className="pid-tile-label">{label}</div>
                <div className="pid-tile-value">{value !== null ? value.toFixed(2) : 'N/A'}</div>
                <div className="pid-tile-unit">{unit}</div>
                <div style={{ color: status }}>
                    {status === "green" ? "Normal" : status === "yellow" ? "Watch" : "Urgent"}
                </div>
            </div>
        </div>
    )
}

export default PIDTile;