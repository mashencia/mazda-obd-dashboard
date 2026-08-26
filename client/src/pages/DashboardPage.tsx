import React, { useState, useEffect } from 'react'
import { Trip } from '../types'
import useTrips from '../hooks/useTrips'
import Header from '../components/Header'
import TripList from '../components/TripList'
import TripDetail from '../components/TripDetails'
import PIDGrid from '../components/PIDGrid'
import HealthIndicator from '../components/HealthIndicator'

function DashboardPage()
{
    const { trips } = useTrips()
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

    useEffect(() => {
        if (trips.length > 0) {
            const mostRecent = trips.sort((a, b) =>
                new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
            )[0]
            setSelectedTrip(mostRecent)
        }
    }, [trips])

    return (
        <div className="dashboard">
            <Header />
            <div className="dashboard-body">
                <TripList onTripSelect={setSelectedTrip} />
                <div className="main-panel">
                    {selectedTrip && (
                        <>
                            <TripDetail trip={selectedTrip} />
                            <PIDGrid tripId={selectedTrip.tripId} />
                            <HealthIndicator healthStatus="green" />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
