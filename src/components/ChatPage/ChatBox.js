import React from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';

const ChatBox = () => {
    const { handleChatInput, chatList } = useChatContext();
    const [input, setInput] = React.useState('');
    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.note}>
                Note: This is a simulated chat with Jesus using AI.
            </div>
            <div className={styles.chatBox}>
                {
                    chatList.map((e, i) =>
                        <ChatListItem {...e} key={i} />
                    )
                }
            </div>
            <input onChange={(e) => setInput(e.target.value)} className={styles.chatInputBox} />
            <button onClick={() => handleChatInput(input)} className={styles.chatInputButton}>Send</button>
        </div>
    );
}

export const ChatBoxContainer = () => {
    return <ChatProvider>
        <ChatBox />
    </ChatProvider>
}

export default ChatBoxContainer;
