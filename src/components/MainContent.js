import React, { useState } from 'react';
import './MainContent.css';
import NoScheduleIcon from '../assets/NoScheduleIcon.png';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('appointment');

  return (
    <div className="main-content">
      <div className="content-tabs">
        <div 
          className={`content-tab ${activeTab === 'appointment' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointment')}
        >
          Appointment
          <span className="badge badge-red">0</span>
        </div>
        <div 
          className={`content-tab ${activeTab === 'arrived' ? 'active' : ''}`}
          onClick={() => setActiveTab('arrived')}
        >
          Arrived
          <span className="badge badge-yellow">0</span>
        </div>
        <div 
          className={`content-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
          <span className="badge badge-green">0</span>
        </div>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="1.5" fill="none"/>
            <path d="M14 14l-3-3" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="table-header-cell">PATIENT NAME</div>
          <div className="table-header-cell">DOB</div>
          <div className="table-header-cell">APPT TIME</div>
          <div className="table-header-cell">INSURANCES</div>
          <div className="table-header-cell">REASON</div>
        </div>

        <div className="empty-state">
          <div className="empty-icon">
            <img src={NoScheduleIcon} alt="No scheduled appointments" />
          </div>
          <div className="empty-text">
            There are no Scheduled Appointments for Today.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

