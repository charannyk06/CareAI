import React, { useState, useEffect, useRef } from 'react';
import './TopNavigation.css';
import CertifyLogo from '../assets/CertifyLogo.png';

const TopNavigation = () => {
  const [isFacilityDropdownOpen, setIsFacilityDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState('Whittaker Family Dental');
  const [selectedLocation, setSelectedLocation] = useState('Location 1');
  const facilityDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const facilities = [
    'Whittaker Family Dental',
    'Whittaker Dental Care Defi'
  ];

  const locations = [
    'Location 1',
    'Location 2',
    'Location 3'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (facilityDropdownRef.current && !facilityDropdownRef.current.contains(event.target)) {
        setIsFacilityDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    };

    if (isFacilityDropdownOpen || isLocationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFacilityDropdownOpen, isLocationDropdownOpen]);

  return (
    <div className="top-navigation">
      <div className="nav-left">
        <div className="nav-icon certify-logo">
          <img src={CertifyLogo} alt="Certify" />
        </div>
        <div className="nav-icon grid-icon-3x3">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            {/* 3x3 Grid - 9 small squares */}
            <rect x="2" y="2" width="4" height="4" fill="#000"/>
            <rect x="8" y="2" width="4" height="4" fill="#000"/>
            <rect x="14" y="2" width="4" height="4" fill="#000"/>
            <rect x="2" y="8" width="4" height="4" fill="#000"/>
            <rect x="8" y="8" width="4" height="4" fill="#000"/>
            <rect x="14" y="8" width="4" height="4" fill="#000"/>
            <rect x="2" y="14" width="4" height="4" fill="#000"/>
            <rect x="8" y="14" width="4" height="4" fill="#000"/>
            <rect x="14" y="14" width="4" height="4" fill="#000"/>
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
            {/* Highlight first cell with border */}
            <rect x="2" y="2" width="5.33" height="5" fill="#E0E0E0" stroke="#666" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
      
      <div className="nav-right">
        <div className="dropdown-container" ref={facilityDropdownRef}>
          <button 
            className="dropdown-button"
            onClick={() => setIsFacilityDropdownOpen(!isFacilityDropdownOpen)}
          >
            {selectedFacility}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`dropdown-arrow ${isFacilityDropdownOpen ? 'open' : ''}`}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isFacilityDropdownOpen && (
            <div className="dropdown-menu">
              {facilities.map((facility) => (
                <div
                  key={facility}
                  className={`dropdown-item ${selectedFacility === facility ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedFacility(facility);
                    setIsFacilityDropdownOpen(false);
                  }}
                >
                  {facility}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown-container" ref={locationDropdownRef}>
          <button 
            className="dropdown-button"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            {selectedLocation}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`dropdown-arrow ${isLocationDropdownOpen ? 'open' : ''}`}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isLocationDropdownOpen && (
            <div className="dropdown-menu">
              {locations.map((location) => (
                <div
                  key={location}
                  className={`dropdown-item ${selectedLocation === location ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLocation(location);
                    setIsLocationDropdownOpen(false);
                  }}
                >
                  {location}
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
        <div className="nav-avatar">
          <div className="avatar-circle">CK</div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;

