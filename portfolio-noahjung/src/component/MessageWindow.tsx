import React, {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import ChatBubble from '../atom/ChatBubble';
import type { ChatBubbleProps } from '../atom/ChatBubble';
import ErrorCard from '../atom/ErrorCard';

const MessageWindow: React.FC = () => {
  const isHome = useLocation().pathname.replace('/', '') === '';

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState<boolean>(false);

  const isFirstLoad = useRef<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggleOpen = () => {
    setHasUnreadMessage(false);
    setIsOpen(!isOpen);
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    if (!input) {
      return;
    }

    setMessages((prev) => [...prev, { isSender: true, text: input }]);
    const currentInput = input;
    setErrorMessage('');
    setInput('');
    setIsLoading(true);

    const pastMessages = [];
    for (let i = 0; i < messages.length; i += 2) {
      if (messages[i] && messages[i + 1]) {
        const messagePair = {
          userMessage: messages[i].text,
          aiMessage: messages[i + 1].text,
        };
        pastMessages.push(messagePair);
      }
    }

    const requestBody = {
      prompt: currentInput,
      pastMessages: pastMessages,
    };

    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const extractedText = await response.text();

    if (response.ok) {
      setMessages((prev) => [
        ...prev,
        { isSender: false, text: extractedText },
      ]);
    } else {
      setErrorMessage(extractedText);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isSender && !isOpen) {
      setHasUnreadMessage(true);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      setHasUnreadMessage(false);
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    if (!isOpen) {
      setHasUnreadMessage(true);
    }

    const timerId = setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1));
      setErrorMessage('');
    }, 10000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  return (
    <>
      {isOpen ? (
        <div style={styles.container_open}>
          {errorMessage && <ErrorCard message={errorMessage} />}
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.headerName}>{ASSISTANT_NAME}</span>
            <div>
              <span onClick={() => handleToggleOpen()}>✕</span>
            </div>
          </div>

          {/* Message Area */}
          <div style={styles.message}>
            {messages.map((message, idx) => (
              <div key={`${idx}`}>
                <ChatBubble isSender={message.isSender} text={message.text} />
              </div>
            ))}
            {isLoading && (
              <ChatBubble isSender={false} text={''} isLoading={true} />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div style={styles.footer}>
            <div style={styles.inputWrapper}>
              <textarea
                placeholder={
                  isLoading ? 'Waiting for response...' : 'Ask about Noah...'
                }
                style={styles.textarea}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
            </div>
            <button
              style={
                isLoading ? styles.sendIconBtnDisabled : styles.sendIconBtn
              }
              onClick={handleSend}
              disabled={isLoading}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isFirstLoad.current && isHome && fadeInCSS}
          {pulseCss}
          <div
            className={
              isFirstLoad.current && isHome ? 'fadeIn-messageWindow' : ''
            }
            style={styles.container_closed}
            onClick={handleToggleOpen}
          >
            <div style={styles.header}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span style={styles.headerName} className="pr-2">
                  {ASSISTANT_NAME}
                </span>
                {hasUnreadMessage && (
                  <div
                    className="unread-pulse"
                    style={styles.notificationBadge}
                  />
                )}
              </div>
              <div style={styles.headerIcons}>
                <span>▲</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ASSISTANT_NAME = "Noah's AI";

const styles: { [key: string]: React.CSSProperties } = {
  container_open: {
    position: 'fixed',
    bottom: 0,
    right: '40px',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px 8px 0 0',
    fontFamily:
      '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    zIndex: 1000,
  },
  container_closed: {
    position: 'fixed',
    bottom: 0,
    right: '40px',
    width: '100%',
    maxWidth: '250px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px 8px 0 0',
    fontFamily:
      '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#cff8ff',
    borderRadius: '8px 8px 0 0',
  },
  headerName: { fontWeight: 600, fontSize: '14px' },
  headerIcons: {
    display: 'flex',
    gap: '12px',
    color: '#666',
    cursor: 'pointer',
  },
  body: { padding: '16px', height: '300px', overflowY: 'auto' },
  message: {
    marginBottom: '20px',
    maxHeight: '450px',
    overflowY: 'auto',
  },
  text: { fontSize: '14px', lineHeight: '1.4', color: '#333' },
  footer: {
    padding: '12px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputWrapper: {
    flex: 1,
  },
  textarea: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    height: '60px',
    padding: '8px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    resize: 'none',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9fafb',
  },
  sendIconBtn: {
    flexShrink: 0,
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '40px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sendIconBtnDisabled: {
    flexShrink: 0,
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '40px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

const fadeInCSS = (
  <style>
    {`
      .fadeIn-messageWindow {
        opacity: 0;
        animation: fadeIn 2s ease-in;
        animation-fill-mode: forwards;
        animation-delay: 3.5s;
      }

      @keyframes fadeIn {
        0%, 100% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
  </style>
);

const pulseCss = (
  <style>{`
        .unread-pulse {
        background: #ff4d4f;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7);
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 77, 79, 0.7); }
        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 77, 79, 0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 77, 79, 0); }
      }
        `}</style>
);

export default MessageWindow;
