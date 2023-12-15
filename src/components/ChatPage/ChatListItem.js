import React, {useState} from 'react';
import styles from './ChatPage.module.scss';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'
import AudioPlayer from './Audio';

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
    return (
        <>
        {/* // <div className={styles.chatBox}> */}
            {chat &&
                <div className={`${styles.chat} ${styles['bg-white']} ${styles.right}`}>
                    {chat}
                </div>
            }
            {result &&
                <div className={`${styles.result}`}>
                    {result}
                    {voice && <span className={styles['play-btn']}  onClick={playAudio}><img src={isOn ? pause : play} alt={isOn ? 'pause' : 'play'} /></span>}
                </div>
            }

            
            {/* {
                voice && <div className={styles.voice}>
                    Play
                    <AudioPlayer audioBuffer={voice} />
                </div>
            } */}
         {/* </div> */}
        </>
    );
}


export default ChatListItem;
