import React, {useState} from 'react';
import styles from './ChatPage.module.scss';
import sendImg from './../../assets/images/send.svg';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'


const ChatBox = () => {
    const[isOn, setIsOn] = useState(false);
    const playAudio = () => {
        setIsOn(!isOn)
    }
    return (
        <>
            <div className={styles.note}>
                Note: This is a simulated chat with Jesus using AI.
            </div>
            <div className={styles.chatBoxContainer}>
                <div className={styles.chatBox}>
                    <div className='bg-blue'>
                        Greetings, my friend. I am Jesus, the Son of God. May I kindly ask for your name?
                        <span className={styles['play-btn']}  onClick={playAudio}><img src={isOn ? pause : play} alt={isOn ? 'pause' : 'play'} /></span>
                    </div>
                    <div className={styles['bg-white']}>
                        Can you share a parable or story that holds a special meaning to you?
                    </div>
                </div>
                <div className={styles.chatInputBox}>
                    <input type='text'  className={styles.chatInput}  />
                    <button className={styles['send-button']}><img src={sendImg} alt="Send" /></button>
                </div>
            </div>
        </>
    );
}

export default ChatBox;
