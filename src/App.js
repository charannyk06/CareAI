import React from 'react';
import './App.css';
import TopNavigation from './components/TopNavigation';
import MainContent from './components/MainContent';
import FAQPanel from './components/FAQPanel';

function App() {
  return (
    <div className="app">
      <TopNavigation />
      <div className="app-body">
        <MainContent />
        <FAQPanel />
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
}

export default App;


