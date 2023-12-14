import React, {useState} from 'react';
import styles from './ChatPage.module.scss';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'

const ChatListItem = ({
    chat,
    chatId,
    result,
    voice
}) => {

    const[isOn, setIsOn] = useState(false);
    const playAudio = () => {
        setIsOn(!isOn)
    }
    console.log('voice',voice);
    return (
        <>
        {/* // <div className={styles.chatBox}> */}

            <div className={`${styles.chat} ${styles['bg-white']}`}>
                {chat}
                
            </div>
            <div className={styles.result}>
                {result}
                <span className={styles['play-btn']}  onClick={playAudio}><img src={isOn ? pause : play} alt={isOn ? 'pause' : 'play'} /></span>
            </div>

            
            {/* {
                voice && <div className={styles.voice} onClick={() => {
                    playBinaryToAudio(voice)
                }}>
                    Play
                    <AudioPlayer binaryData={voice} />
                    <audio controls src={voice} />
                </div>
            } */}
         {/* </div> */}
        </>
    );
}


export default ChatListItem;
