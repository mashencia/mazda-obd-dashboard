import React, { useState, useEffect } from 'react'
import { Trip } from '../types'
import useTrips from '../hooks/useTrips'
import Header from '../components/Header'
import TripList from '../components/TripList'
import TripDetail from '../components/TripDetails'
import PIDGrid from '../components/PIDGrid'
import './DashboardPage.css'

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
            <div className="layout">
                <TripList selectedTripId={selectedTrip?.tripId} onTripSelect={setSelectedTrip} />
                <div className="main">
                    {selectedTrip && (
                        <>
                            <TripDetail trip={selectedTrip} />
                            <div className="pid-section">
                                <PIDGrid tripId={selectedTrip.tripId} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
