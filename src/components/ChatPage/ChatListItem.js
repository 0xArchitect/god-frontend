import React from 'react';
import styles from './ChatPage.module.scss';

const ChatListItem = ({
    chat,
    chatId,
    result,
    voice
}) => {
    console.log('voice',voice);
    return (
        <div className={styles.chatListItem}>
            <div className={styles.chat}>
                {chat}
            </div>
            <div className={styles.result}>
                {result}
            </div>
            {voice && <div className={styles.voice} onClick={() => {
                // playBinaryToAudio(voice)
            }}>
                Play
                {/* <AudioPlayer binaryData={voice} /> */}
                <audio controls src={voice} />
            </div>}
        </div>
    );
}


export default ChatListItem;
