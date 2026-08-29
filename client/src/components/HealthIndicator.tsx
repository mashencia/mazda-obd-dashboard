import React from 'react';
import './HealthIndicator.css'

interface HealthIndicatorProps {
    healthStatus: "green" | "yellow" | "red";
}

function HealthIndicator({ healthStatus }: HealthIndicatorProps)
{
    return (
        <div className="pills">
            <div className={`pill pill-g ${healthStatus === 'green' ? 'active' : ''}`}>Normal</div>
            <div className={`pill pill-y ${healthStatus === 'yellow' ? 'active' : ''}`}>Watch</div>
            <div className={`pill pill-r ${healthStatus === 'red' ? 'active' : ''}`}>Urgent</div>
        </div>
    )
}

export default HealthIndicator;
