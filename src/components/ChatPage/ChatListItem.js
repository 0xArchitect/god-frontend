import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.scss';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'

function createWavFile(binaryData) {
    const blob = new Blob([binaryData], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
}


const ChatListItem = ({
    chat,
    chatId,
    result,
    voice
}) => {
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = useCallback(() => {
        var src = source;

        if (!audioContext || !audioBuffer) return;

        if (!source) {
            const newSource = audioContext.createBufferSource();
            newSource.buffer = audioBuffer;
            newSource.connect(audioContext.destination);
            src = newSource;
            setSource(newSource);
        }

        if (isPlaying) {
            src && src.stop();
        } else {
            src && src.start();
        }

        setIsPlaying(!isPlaying);
    }, [audioBuffer]);

    const fun = (arrayBuffer) => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        const uint8Array = new Uint8Array(arrayBuffer);
        const arrayBuffer1 = uint8Array.buffer
        context.decodeAudioData(arrayBuffer1, (buffer) => {
            setAudioBuffer(buffer);

            const newSource = context.createBufferSource();
            newSource.buffer = buffer;
            newSource.connect(context.destination);
            setSource(newSource);

            if (newSource) {
                newSource.start();
                setIsPlaying(true);
            }
        });

    }

    useEffect(() => {
        if (voice) {
            fun(voice)
        }
    }, [voice])

    useEffect(() => {
        if (source) {
            source.onended = () => {
                setIsPlaying(false);
            };
        }
    }, [source])

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
                    {voice && <span className={styles['play-btn']} onClick={handlePlayPause}><img src={isPlaying ? pause : play} alt={isPlaying ? 'pause' : 'play'} /></span>}
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
