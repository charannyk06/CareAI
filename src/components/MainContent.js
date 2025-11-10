import React, { useState } from 'react';
import './MainContent.css';

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
        <input 
          type="text" 
          placeholder="Q Search" 
          className="search-input"
        />
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
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="60" fill="#e8e8e8"/>
              {/* Person silhouettes */}
              <circle cx="50" cy="50" r="10" fill="#ccc"/>
              <circle cx="70" cy="50" r="10" fill="#ccc"/>
              <circle cx="90" cy="50" r="10" fill="#ccc"/>
              <path d="M35 75 Q50 65 70 75 T105 75" stroke="#ccc" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Floating circles */}
              <circle cx="25" cy="30" r="4" fill="#ccc" opacity="0.4"/>
              <circle cx="115" cy="35" r="3" fill="#ccc" opacity="0.4"/>
              <circle cx="20" cy="65" r="3.5" fill="#ccc" opacity="0.4"/>
              <circle cx="120" cy="75" r="3" fill="#ccc" opacity="0.4"/>
              <circle cx="30" cy="95" r="3" fill="#ccc" opacity="0.4"/>
              <circle cx="110" cy="100" r="3.5" fill="#ccc" opacity="0.4"/>
              <circle cx="45" cy="25" r="2.5" fill="#ccc" opacity="0.4"/>
              <circle cx="100" cy="20" r="2" fill="#ccc" opacity="0.4"/>
            </svg>
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

