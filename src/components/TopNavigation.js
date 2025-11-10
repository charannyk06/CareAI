import React, { useState, useEffect, useRef } from 'react';
import './TopNavigation.css';
import CertifyLogo from '../assets/CertifyLogo.png';

const TopNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState('Whittaker Family Dental');
  const dropdownRef = useRef(null);

  const practices = [
    'Whittaker Family Dental',
    'Whittaker Dental Care Defi'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="top-navigation">
      <div className="nav-left">
        <div className="nav-icon certify-logo">
          <img src={CertifyLogo} alt="Certify" />
        </div>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            {/* 3x3 Grid - 9 squares */}
            <rect x="2" y="2" width="4" height="4" fill="#666"/>
            <rect x="7" y="2" width="4" height="4" fill="#666"/>
            <rect x="12" y="2" width="4" height="4" fill="#666"/>
            <rect x="2" y="7" width="4" height="4" fill="#666"/>
            <rect x="7" y="7" width="4" height="4" fill="#666"/>
            <rect x="12" y="7" width="4" height="4" fill="#666"/>
            <rect x="2" y="12" width="4" height="4" fill="#666"/>
            <rect x="7" y="12" width="4" height="4" fill="#666"/>
            <rect x="12" y="12" width="4" height="4" fill="#666"/>
          </svg>
        </div>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            {/* Hamburger - top and bottom shorter, middle longer */}
            <rect x="2" y="5" width="10" height="1.5" fill="#666"/>
            <rect x="2" y="9" width="14" height="1.5" fill="#666"/>
            <rect x="2" y="13" width="10" height="1.5" fill="#666"/>
          </svg>
        </div>
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            {/* List - rectangle divided into 3 horizontal sections */}
            <rect x="2" y="2" width="16" height="16" stroke="#666" strokeWidth="1.5" fill="none"/>
            <line x1="2" y1="7" x2="18" y2="7" stroke="#666" strokeWidth="1.5"/>
            <line x1="2" y1="12" x2="18" y2="12" stroke="#666" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="nav-icon table-icon">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            {/* Table - top portion with 3 columns, bottom empty */}
            <rect x="2" y="2" width="16" height="16" stroke="#666" strokeWidth="1.5" fill="none"/>
            <line x1="7.33" y1="2" x2="7.33" y2="7" stroke="#666" strokeWidth="1.5"/>
            <line x1="12.67" y1="2" x2="12.67" y2="7" stroke="#666" strokeWidth="1.5"/>
            <line x1="2" y1="7" x2="18" y2="7" stroke="#666" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
      
      <div className="nav-right">
        <div className="practice-dropdown-container" ref={dropdownRef}>
          <button 
            className="practice-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedPractice}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="practice-dropdown-menu">
              {practices.map((practice) => (
                <div
                  key={practice}
                  className={`practice-dropdown-item ${selectedPractice === practice ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPractice(practice);
                    setIsDropdownOpen(false);
                  }}
                >
                  {practice}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#666" strokeWidth="1.5" fill="none"/>
            <text x="10" y="14" textAnchor="middle" fill="#666" fontSize="10" fontWeight="bold">?</text>
          </svg>
        </div>
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M13.66 13.66l1.41 1.41M4.93 15.07l1.41-1.41M13.66 6.34l1.41-1.41" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="6" stroke="#666" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="#666"/>
          </svg>
        </div>
        <div className="nav-avatar">
          <div className="avatar-circle">CK</div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;

