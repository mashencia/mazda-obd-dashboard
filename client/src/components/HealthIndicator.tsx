import React from 'react';

interface HealthIndicatorProps {
    healthStatus: "green" | "yellow" | "red"; 
}

function HealthIndicator({ healthStatus }: HealthIndicatorProps)
{
    return (
        <div className="health-pills">
            <div className={`pill ${healthStatus === 'green' ? 'active' : ''}`}>NORMAL</div>
            <div className={`pill ${healthStatus === 'yellow' ? 'active' : ''}`}>WATCH</div>
            <div className={`pill ${healthStatus === 'red' ? 'active' : ''}`}>URGENT</div>
        </div>
    )
}

export default HealthIndicator;