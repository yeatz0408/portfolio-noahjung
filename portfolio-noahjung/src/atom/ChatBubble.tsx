export interface ChatBubbleProps {
    isSender : boolean;
    text : string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isSender, text }) => {
    return (
        <div style={styles.container(isSender)}>
            <div style={styles.bubble(isSender)}>{text}</div>
        </div>
    );
}

const styles = {
    container: (isSender: boolean): React.CSSProperties => ({
        display: 'flex',
        width: '100%',
        margin: '16px 0',
        justifyContent: isSender ? 'flex-start' : 'flex-end'
    }),
    bubble: (isSender: boolean) : React.CSSProperties => ({
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
        textAlign: 'left'        
    })
}

export default ChatBubble;