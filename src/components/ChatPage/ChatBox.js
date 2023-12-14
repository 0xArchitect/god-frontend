import React from 'react';
import styles from './ChatPage.module.scss';


const ChatBox = () => {
    return (
        <div className={styles.chatBoxContainer}>
            <div className={styles.note}>
                Note: This is a simulated chat with Jesus using AI.
            </div>
            <div className={styles.chatBox}>

            </div>
            <input className={styles.chatInputBox} />
        </div>
    );
}

export default ChatBox;
