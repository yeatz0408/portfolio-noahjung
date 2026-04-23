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
    padding: '12px 16px',
    borderBottom: '1px solid #bae6fd',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px 8px 0 0',
  },
  headerName: {
    fontWeight: 700,
    fontSize: '15px',
    color: '#0c4a6e',
    letterSpacing: '0.3px',
    textShadow: '0 1px 2px rgba(12, 74, 110, 0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  headerIcons: {
    display: 'flex',
    gap: '12px',
    color: '#0ea5e9', // text-sky-500 (matches toggleBtn text)
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
    flexDirection: 'column',
    alignItems: 'stretch',
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
  hoveringBubble: {
    position: 'absolute',
    top: '-35px',
    right: '25px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '12px 12px 0 12px',
    fontSize: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',

    transformOrigin: 'bottom right',
    animation:
      'springIn 0.6s ease-out forwards, floatAttract 2.5s ease-in-out infinite 0.6s',
  },
};

export const fadeInCSS = (
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

export const pulseCss = (
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

export default styles;
