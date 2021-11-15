import React from 'react'
import TalentyLogo from '../Assets/Icons/TalentyLogo'
import CvTemplate from '../CvTemplate'
import './index.css'

function Dashboard() {
    return (
        <div className='dashboard-wrapper'>
            <div className="header">
                <TalentyLogo />
            </div>
            <div className='left-navbar'></div>
            <main className='main-section-wrapper'>
                <div className='main-section'>
                    <CvTemplate />
                </div>
            </main>
        </div>
    )
}

export default Dashboard