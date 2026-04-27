import { useEffect, useRef } from 'react';
import useTypewriterEffect from '../customHook/useTypewriterEffect';

export interface ChatBubbleProps {
  isSender: boolean;
  text: string;
  isLoading?: boolean;
  isAnimating?: boolean;
  isNew?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  isSender,
  text,
  isLoading,
  isAnimating,
  isNew,
}) => {
  const shouldAnimate = isAnimating && isNew;
  const animatedText = useTypewriterEffect(shouldAnimate ? text : '', 30);
  const displayText = shouldAnimate ? animatedText : text;
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldAnimate && bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [displayText, shouldAnimate]);

  return (
    <div style={styles.container(isSender)}>
      <div ref={bubbleRef} style={styles.bubble(isSender)}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <style>
              {`
                @keyframes blink {
                  0% { opacity: 0.2; }
                  20% { opacity: 1; }
                  100% { opacity: 0.2; }
                }
              `}
            </style>
            <span style={{ ...styles.dot, animationDelay: '0s' }}>•</span>
            <span style={{ ...styles.dot, animationDelay: '0.2s' }}>•</span>
            <span style={{ ...styles.dot, animationDelay: '0.4s' }}>•</span>
          </div>
        ) : (
          displayText
        )}
      </div>
    </div>
  );
};

const styles = {
  container: (isSender: boolean): React.CSSProperties => ({
    display: 'flex',
    width: '100%',
    margin: '16px 0',
    justifyContent: isSender ? 'flex-start' : 'flex-end',
  }),
  bubble: (isSender: boolean): React.CSSProperties => ({
    maxWidth: '75%',
    padding: '8px 16px',
    fontSize: '15px',
    lineHeight: '1.6',
    position: 'relative',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
    backgroundColor: isSender ? '#cff8ff' : '#F2F2F2',
    color: '#000',
    borderRadius: '20px',
    borderTopRightRadius: isSender ? '20px' : '4px',
    borderTopLeftRadius: isSender ? '4px' : '20px',
    marginRight: isSender ? '8px' : '0',
    marginLeft: isSender ? '0' : '8px',
    textAlign: 'left',
    minHeight: '24px',
  }),
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24px',
    gap: '4px',
  } as React.CSSProperties,
  dot: {
    fontSize: '24px',
    lineHeight: '1',
    animationName: 'blink',
    animationDuration: '1.4s',
    animationIterationCount: 'infinite',
    animationFillMode: 'both',
  } as React.CSSProperties,
};

export default ChatBubble;
