import React from 'react';

interface ErrorCardProps {
  message: string;
}

const ErrorCard = ({ message }: ErrorCardProps) => {
  return (
    <>
      {fadeOutCSS}
      <div style={errorStyles.overlay} className="fadeOut-card">
        <div style={errorStyles.card}>
          <div style={errorStyles.message}>
            <strong>Oops!</strong> {message}
          </div>
        </div>
      </div>
    </>
  );
};

const errorStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 1001,
    borderRadius: '8px 8px 0 0',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: '8px',
    boxShadow: '0 6px 16px rgba(220, 38, 38, 0.15)',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    padding: '24px',
    fontSize: '16px',
    color: '#991B1B',
    textAlign: 'center',
    lineHeight: '1.5',
    wordBreak: 'break-word',
  },
};

const fadeOutCSS = (
  <style>
    {`
      .fadeOut-card {
        opacity: 1;
        animation: fadeOut 10s ease-in-out forwards; 
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        60% {
          opacity: 1; 
        }
        100% {
          opacity: 0; 
          visibility: hidden; 
        }
      }
    `}
  </style>
);

export default ErrorCard;
