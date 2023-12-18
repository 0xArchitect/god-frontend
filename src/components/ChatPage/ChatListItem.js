import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ChatPage.module.scss';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'
import { useChatContext } from './ChatProvider'

const ChatListItem = ({
    chat,
    chatId,
    result,
    voice,
    index,
}) => {
    const {
        setAudioBuffer,
        isPlaying,
        toggleAudioPlayback,
        setBuffer,
        setIsPlaying,
        setCurrentIndex,
        currentIndex,
        setBufferContext
    } = useChatContext();
    // const [audioContext, setAudioContext] = useState(null);
    // const [audioBuffer, setAudioBuffer] = useState(null);
    // const [source, setSource] = useState(null);
    // const [isPlaying, setIsPlaying] = useState(false);

    // const handlePlayPause = useCallback(() => {
    //     console.log('src', isPlaying, source);

    //     if (!audioContext || !audioBuffer) return;

    //     // if (!source) {
    //     //     const newSource = audioContext.createBufferSource();
    //     //     newSource.buffer = audioBuffer;
    //     //     newSource.connect(audioContext.destination);
    //     //     src = newSource;
    //     //     setSource(newSource);
    //     // }

    //     if (isPlaying) {
    //         console.log('stop')
    //         source.stop();
    //     } else {
    //         console.log('start')
    //         source.start(0);
    //     }

    //     setIsPlaying((p) => !p);
    // }, [audioBuffer, source, isPlaying]);

    // const fun = (arrayBuffer) => {
    //     const context = new (window.AudioContext || window.webkitAudioContext)();
    //     setAudioContext(context);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     const arrayBuffer1 = uint8Array.buffer
    //     context.decodeAudioData(arrayBuffer1, (buffer) => {
    //         setAudioBuffer(buffer);

    //         const newSource = context.createBufferSource();
    //         newSource.buffer = buffer;
    //         newSource.connect(context.destination);
    //         setSource(newSource);

    //         // if (newSource) {
    //         //     // newSource.start();
    //         //     // setIsPlaying(newSource.context.state == 'running');
    //         // }
    //     });
    // }

    // useEffect(() => {
    //     if (voice) {
    //         fun(voice)
    //     }
    // }, [voice])

    // useEffect(() => {
    //     if (source) {
    //         source.context.onstatechange = (event) => {
    //             const isRunning = event.target.state == 'running';
    //             console.log('isRunning', isRunning);
    //             setIsPlaying(isRunning);
    //         }
    //         source.onended = () => {
    //             setIsPlaying(false);
    //         };
    //     }
    // }, [source])

    const isCurrentPlaying = currentIndex === index;
    const chatRef = useRef(null);

    const resultRef = useRef(null);

    useEffect(() => {
        // Delayed execution to ensure elements are in DOM
        setTimeout(() => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.fadeIn);
                        entry.target.classList.remove(styles.fadeOut);
                    } else {
                        entry.target.classList.remove(styles.fadeIn);
                        entry.target.classList.add(styles.fadeOut);
                    }
                });
            }, {
                threshold: 1,
                rootMargin: '-180px 0px 0px 0px'
            });

            const chatElement = chatRef.current;
            const resultElement = resultRef.current;

            if (chatElement) {
                observer.observe(chatElement);
                if (chatElement.getBoundingClientRect().top < window.innerHeight) {
                    chatElement.classList.add(styles.fadeIn);
                }
            }
            if (resultElement) {
                observer.observe(resultElement);
            }

            return () => {
                if (chatElement) {
                    observer.unobserve(chatElement);
                }
                if (resultElement) {
                    observer.unobserve(resultElement);
                }
            };
        }, 100); // Delay of 100ms
    }, []);

    return (
        <>
            {/* // <div className={styles.chatBox}> */}
            {chat &&
                <div ref={resultRef} className={`${styles.chat} ${styles['bg-white']} ${styles.right} ${styles.fadeOut}`}>
                    {chat}
                </div>
            }
            {result &&
                <div ref={chatRef} className={`${styles.result} ${styles.left} ${styles.fadeOut}`}>
                    {result}
                    {voice && <span className={styles['play-btn']} onClick={() => {
                        if (isCurrentPlaying) {
                            toggleAudioPlayback();
                        }
                        else {
                            setBufferContext(voice);
                            setCurrentIndex(index)
                        }
                    }}><img src={isCurrentPlaying && isPlaying ? pause : play} alt={isCurrentPlaying && isPlaying ? 'pause' : 'play'} /></span>}
                    {/* {
                        voice && <AudioPlayer buffer={voice} index={index} />
                    } */}
                </div>
            }
            {/* </div> */}
        </>
    );
}


export default ChatListItem;
