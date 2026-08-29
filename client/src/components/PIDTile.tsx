import React from 'react';
import './PIDTile.css'

interface PIDTileProps {
    label: string;
    value: number | null;
    unit: string;
    status: "green" | "yellow" | "red";
    sparkline?: number[];
}

const STATUS_META = {
    green: { textClass: 'status-ok', sparkClass: 'spark-ok', icon: '●', text: 'Normal' },
    yellow: { textClass: 'status-warn', sparkClass: 'spark-warn', icon: '⚠', text: 'Watch' },
    red: { textClass: 'status-alert', sparkClass: 'spark-alert', icon: '⛔', text: 'Urgent' },
} as const;

function PIDTile({ label, value, unit, status, sparkline = [] }: PIDTileProps) {
    const meta = STATUS_META[status];
    const min = sparkline.length ? Math.min(...sparkline) : 0;
    const max = sparkline.length ? Math.max(...sparkline) : 0;
    const range = max - min || 1;

    return (
        <div className="pid-tile">
            <div className="pid-header">
                <div className="pid-name">{label}</div>
                <div className="pid-unit">{unit}</div>
            </div>
            <div className="pid-val">{value !== null ? value.toFixed(1) : 'N/A'}</div>
            <div className="sparkline">
                {sparkline.map((v, i) => (
                    <div
                        key={i}
                        className={`spark ${meta.sparkClass}`}
                        style={{ height: `${Math.max(8, ((v - min) / range) * 100)}%` }}
                    />
                ))}
            </div>
            <div className={`pid-status ${meta.textClass}`}>{meta.icon} {meta.text}</div>
        </div>
    )
}

export default PIDTile;
