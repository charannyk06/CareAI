import React, { useState, useEffect } from 'react';
import './FAQPanel.css';
import ChatBotIcon from '../assets/ChatBot.svg';
import CloseIcon from '../assets/CloseIcon.svg';
import SendButtonIcon from '../assets/SendButton.svg';

const FAQPanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('faq-panel-open');
    } else {
      document.body.classList.remove('faq-panel-open');
    }
    return () => {
      document.body.classList.remove('faq-panel-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="faq-overlay"></div>
      <div className="faq-panel">
      <div className="faq-header">
        <div className="faq-header-left">
          <div className="faq-icon">
            <img src={ChatBotIcon} alt="ChatBot" />
          </div>
          <span className="faq-title">Care AI Product FAQ</span>
        </div>
        <button className="faq-close" onClick={() => setIsOpen(false)}>
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>

      <div className="faq-messages">
        <div className="message user-message">
          <div className="message-bubble user-bubble">
            Patient Communications
          </div>
          <div className="message-time">11:09 PM</div>
        </div>

        <div className="message ai-message">
          <div className="message-icon">
            <img src={ChatBotIcon} alt="AI" />
          </div>
          <div className="message-bubble ai-bubble">
            Based on the content provided, for patient communications, you can utilize Patient Connect &gt; Conversations for outgoing communications. Additionally, you can refer to the Two-Way Communication Report for a detailed overview of staff interactions and closure status. Patient Broadcast allows for one-way communication, while Two-Way Communication enables interactive messaging with patients.
          </div>
          <div className="message-time">11:09 PM</div>
        </div>
      </div>

      <div className="faq-input-container">
        <input 
          type="text" 
          placeholder="Ask a question.." 
          className="faq-input"
        />
        <button className="faq-send-button">
          <div className="send-button-bg">
            <img src={SendButtonIcon} alt="Send" />
          </div>
        </button>
      </div>
    </div>
    </>
  );
};

export default FAQPanel;

