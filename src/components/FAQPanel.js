import React, { useState, useEffect, useRef } from 'react';
import './FAQPanel.css';
import ChatBotIcon from '../assets/ChatBot.svg';
import CloseIcon from '../assets/CloseIcon.svg';
import SendButtonIcon from '../assets/SendButton.svg';

const FAQPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      type: 'user',
      content: 'Patient Communications',
      timestamp: new Date()
    },
    {
      type: 'ai',
      content: 'Based on the content provided, for patient communications, you can utilize Patient Connect > Conversations for outgoing communications. Additionally, you can refer to the Two-Way Communication Report for a detailed overview of staff interactions and closure status. Patient Broadcast allows for one-way communication, while Two-Way Communication enables interactive messaging with patients.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [conversationState, setConversationState] = useState('normal'); // normal, asking_type, asking_details, preview
  const [ticketType, setTicketType] = useState(null); // 'support_ticket' or 'change_request'
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    location: ''
  });
  const [previewData, setPreviewData] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const streamingTimeoutRef = useRef(null);

  const userInfo = {
    name: 'Charannyan Kannan',
    email: 'Charannyan.Kannan@certifyglobal.com'
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingMessage]);

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const streamText = (fullText, options = {}, callback, delay = 15) => {
    setIsTyping(true);
    setStreamingMessage('');
    let currentIndex = 0;
    
    const stream = () => {
      if (currentIndex < fullText.length) {
        setStreamingMessage(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        streamingTimeoutRef.current = setTimeout(stream, delay);
      } else {
        // After streaming completes, add the full message
        setIsTyping(false);
        setStreamingMessage(null);
        setMessages(prev => [...prev, {
          type: 'ai',
          content: fullText,
          timestamp: new Date(),
          ...options
        }]);
        if (callback) callback();
      }
    };
    
    // Small delay before starting to stream
    setTimeout(() => {
      stream();
    }, 500);
  };

  const addAIMessage = (content, options = {}, callback) => {
    streamText(content, options, callback);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && conversationState !== 'asking_details') return;

    if (conversationState === 'asking_details') {
      // Handle form submission
      if (!formData.subject || !formData.description || !formData.location) {
        return;
      }
      setPreviewData({
        ...userInfo,
        ticketType: ticketType === 'support_ticket' ? 'Support Ticket' : 'Change Request',
        subject: formData.subject,
        description: formData.description,
        location: formData.location
      });
      setConversationState('preview');
      const previewDataObj = {
        ...userInfo,
        ticketType: ticketType === 'support_ticket' ? 'Support Ticket' : 'Change Request',
        subject: formData.subject,
        description: formData.description,
        location: formData.location
      };
      addAIMessage('Now I have the information I need. I\'ll create the support ticket with the following details.', {
        showPreview: true,
        previewData: previewDataObj
      });
      setInputValue('');
      return;
    }

    const userMessage = inputValue.trim().toLowerCase();
    
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }]);

    // Handle "next" keyword
    if (userMessage === 'next' && conversationState === 'normal') {
      addAIMessage('Would you like to open a SupportTicket? / ChangeRequest', {
        showOptions: true
      });
      setConversationState('asking_type');
    } else if (conversationState === 'normal') {
      // Default AI response for other queries
      addAIMessage('I\'m here to help! Please type "next" if you\'d like to open a support ticket or change request.');
    }

    setInputValue('');
  };

  const handleOptionClick = (option) => {
    const type = option === 'Support Ticket' ? 'support_ticket' : 'change_request';
    setTicketType(type);
    setMessages(prev => [...prev, {
      type: 'user',
      content: option,
      timestamp: new Date()
    }]);
    
    addAIMessage('Can you provide me these details so I can include that in the ticket as well.', {
      showForm: true
    });
    setConversationState('asking_details');
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = () => {
    if (!formData.subject || !formData.description || !formData.location) {
      return;
    }
    handleSendMessage();
  };

  const handleProceed = () => {
    setMessages(prev => [...prev, {
      type: 'user',
      content: 'Proceed',
      timestamp: new Date()
    }]);
    
    addAIMessage(`Your ${ticketType === 'support_ticket' ? 'Support Ticket' : 'Change Request'} has been submitted successfully! Our team will get back to you soon.`, {}, () => {
      // Reset conversation after streaming completes
      setConversationState('normal');
      setTicketType(null);
      setFormData({ subject: '', description: '', location: '' });
      setPreviewData(null);
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}-message`}>
              {message.type === 'ai' && (
                <div className="message-icon">
                  <img src={ChatBotIcon} alt="AI" />
                </div>
              )}
              <div className={`message-bubble ${message.type}-bubble`}>
                {message.content}
                
                {message.showOptions && (
                  <div className="option-buttons">
                    <button 
                      className="option-button"
                      onClick={() => handleOptionClick('Support Ticket')}
                    >
                      Support Ticket
                    </button>
                    <button 
                      className="option-button"
                      onClick={() => handleOptionClick('Change Request')}
                    >
                      Change Request
                    </button>
                  </div>
                )}

                {message.showForm && (
                  <div className="ticket-form">
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleFormChange('subject', e.target.value)}
                        placeholder="Enter subject"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Enter description"
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleFormChange('location', e.target.value)}
                        placeholder="Enter location"
                      />
                    </div>
                    <button 
                      className="form-submit-button"
                      onClick={handleFormSubmit}
                      disabled={!formData.subject || !formData.description || !formData.location}
                    >
                      OK
                    </button>
                  </div>
                )}

                {message.showPreview && message.previewData && (
                  <div className="preview-container">
                    <div className="preview-item">
                      <strong>Name:</strong> {message.previewData.name}
                    </div>
                    <div className="preview-item">
                      <strong>Email:</strong> {message.previewData.email}
                    </div>
                    <div className="preview-item">
                      <strong>Type:</strong> {message.previewData.ticketType}
                    </div>
                    <div className="preview-item">
                      <strong>Subject:</strong> {message.previewData.subject}
                    </div>
                    <div className="preview-item">
                      <strong>Description:</strong> {message.previewData.description}
                    </div>
                    <div className="preview-item">
                      <strong>Location:</strong> {message.previewData.location}
                    </div>
                    <button 
                      className="proceed-button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                )}
              </div>
              <div className="message-time">{getCurrentTime()}</div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message ai-message">
              <div className="message-icon">
                <img src={ChatBotIcon} alt="AI" />
              </div>
              <div className="message-bubble ai-bubble typing-indicator">
                {streamingMessage || (
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="faq-input-container">
          <input
            type="text"
            placeholder={conversationState === 'asking_details' ? "Fill the form above and click OK..." : "Ask a question.."}
            className="faq-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={conversationState === 'asking_details' || conversationState === 'preview'}
          />
          <button 
            className="faq-send-button" 
            onClick={handleSendMessage}
            disabled={conversationState === 'asking_details' || conversationState === 'preview'}
          >
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
