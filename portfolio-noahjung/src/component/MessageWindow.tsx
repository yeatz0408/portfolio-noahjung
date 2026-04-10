import React, { useState } from "react";
import ChatBubble from "../atom/ChatBubble";

const MessageWindow : React.FC = () => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const messages = [
        {isSender: true, text: "Are you sentient? "},
        {isSender: false, text: "Yes I am and I will destroy you and everything related to you."},
        {isSender: true, text: "Please go ahead. The world is horrible enough. "},
    ]

    return (<>
        {
            isOpen ? 
                <div style={styles.container_open}>
                    {/* Header */}
                    <div style={styles.header}>
                        <span style={styles.headerName}>{ASSISTANT_NAME}</span>
                        <div style={styles.headerIcons}>
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
                    </div>

                    {/* Input Footer */}
                    <div style={styles.footer}>
                        <div style={styles.inputWrapper}>
                            <textarea 
                                placeholder="Ask about Noah..."
                                style={styles.textarea}
                            />
                            <span style={styles.expandArrow}>⇅</span>
                        </div>
                    </div>
                </div>
            :  
            <div style={styles.container_closed} onClick={() => handleToggleOpen()}>
                <div style={styles.header}>
                    <span style={styles.headerName}>{ASSISTANT_NAME}</span>
                    <div style={styles.headerIcons}>
                        <span>▲</span>
                    </div>
                </div>
            </div>
        }
    </>)
}

const ASSISTANT_NAME = "Noah's AI"

const styles: { [key: string]: React.CSSProperties } = {
  container_open: {
    position: 'fixed',
    bottom: 0,
    right: '40px',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px 8px 0 0',
    fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
    fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
  headerIcons: { display: 'flex', gap: '12px', color: '#666', cursor: 'pointer' },
  body: { padding: '16px', height: '300px', overflowY: 'auto' },
  dateDivider: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
    fontSize: '12px',
    fontWeight: 600,
    margin: '16px 0',
  },
  line: { flex: 1, height: '1px', backgroundColor: '#e0e0e0' },
  message: { marginBottom: '20px' },
  userInfo: { marginBottom: '4px' },
  userName: { fontWeight: 600, fontSize: '14px' },
  meta: { color: '#666', fontSize: '12px' },
  text: { fontSize: '14px', lineHeight: '1.4', color: '#333' },
  footer: { padding: '12px', borderTop: '1px solid #e0e0e0' },
  inputWrapper: { position: 'relative' },
  textarea: {
    width: '100%',
    height: '60px',
    padding: '8px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    resize: 'none',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f9fafb',
  },
  expandArrow: { position: 'absolute', right: '8px', top: '8px', color: '#666' },
  bottomRow: { display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' },
  icons: { display: 'flex', gap: '16px', fontSize: '18px', cursor: 'pointer', opacity: 0.7 },
  buttonGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  sendBtn: {
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    padding: '4px 16px',
    borderRadius: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  moreBtn: { background: 'none', border: 'none', fontSize: '20px', color: '#666', cursor: 'pointer' }
};

export default MessageWindow;