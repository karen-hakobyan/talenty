import React from 'react'
import { useSelector } from 'react-redux'
import TalentyLogo from '../Assets/Icons/TalentyLogo'
import CvTemplate from '../CvTemplate'
import './index.css'

function Dashboard() {
    const systemTemplate = useSelector(state => state.main)
    console.log(systemTemplate);
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