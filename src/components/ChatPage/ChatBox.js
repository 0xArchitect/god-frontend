import React, {useState} from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';
import sendImg from './../../assets/images/send.svg';

const ChatBox = () => {
    const { handleChatInput, chatList } = useChatContext();
    const [input, setInput] = React.useState('');
    return (
        <>
            <div className={styles.note}>
                Note: This is a simulated chat with Jesus using AI.
            </div>
            <div className={styles.box}>
                <div className={styles.chatBoxContainer}>
                    <div className={styles.chatBox}>
                        {
                            chatList.map((e, i) =>
                                <ChatListItem {...e} key={i} />
                            )
                        }
                    </div>
                    
                </div>
                <div className={styles.chatInputBox}>
                        <input type='text'  className={styles.chatInput}  onChange={(e) => setInput(e.target.value)} />
                        <button className={styles['send-button']} onClick={() => handleChatInput(input)} ><img src={sendImg} alt="Send" /></button>
                    </div>
            </div>
        </>
    );
}

export const ChatBoxContainer = () => {
    return <ChatProvider>
        <ChatBox />
    </ChatProvider>
}

export default ChatBoxContainer;
