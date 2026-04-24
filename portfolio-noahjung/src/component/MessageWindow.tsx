import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatBubble from '../atom/ChatBubble';
import ErrorCard from '../atom/ErrorCard';
import ProgressBar from '../atom/ProgressBar';
import useChat from '../customHook/useChat';

import styles, {
  fadeInCSS,
  pulseCss,
  springInCss,
} from './MessageWindow.style';
import { useLimitStore } from '../store/useStore';

const MessageWindow: React.FC = () => {
  const isHome = useLocation().pathname.replace('/', '') === '';

  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState<boolean>(false);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);

  const isFirstLoad = useRef<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { aiChatLimits } = useLimitStore.getState();
  const { minute } = aiChatLimits;

  const {
    isLoading,
    messages,
    setMessages,
    errorMessage,
    setErrorMessage,
    handleSend,
  } = useChat();

  const onClickSend = () => {
    handleSend(input, () => setInput(''));
  };

  const handleToggleOpen = () => {
    setHasUnreadMessage(false);
    setIsOpen(!isOpen);
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClickSend();
    }
  };

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 10000);
    return () => clearTimeout(timer);
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

    if (messages[messages.length - 1].isSender) {
      setMessages((prev) => prev.slice(0, -1));
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 15000);
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
              <button
                className={'cursor-pointer'}
                onClick={() => handleToggleOpen()}
              >
                ✕
              </button>
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
            {/* Top Row: Textarea and Button */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
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
                  maxLength={300}
                />
              </div>
              <button
                style={
                  isLoading ? styles.sendIconBtnDisabled : styles.sendIconBtn
                }
                onClick={onClickSend}
                disabled={isLoading}
              >
                ➤
              </button>
            </div>

            <ProgressBar max={300} min={0} value={input.length} />
          </div>
        </div>
      ) : (
        <div>
          {isFirstLoad.current && isHome && fadeInCSS}
          {pulseCss}
          {springInCss}

          <div
            className={
              isFirstLoad.current && isHome ? 'fadeIn-messageWindow' : ''
            }
            style={styles.container_closed}
            onClick={handleToggleOpen}
          >
            {!minute && showTeaser && (
              <div className="teaser-bubble" style={styles.hoveringBubble}>
                Ask AI about Noah? 👋
              </div>
            )}

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
export default MessageWindow;
