import React, { useState, useEffect } from 'react';
import styles from './ChatPage.module.scss';
import play from './../../assets/images/play_icon.svg';
import pause from './../../assets/images/pause_icon.svg'

const AudioPlayer = ({ buffer }) => {
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [startOffset, setStartOffset] = useState(0);
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        // Initialize audio context
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);

        const uint8Array = new Uint8Array(buffer);
        const arrayBuffer1 = uint8Array.buffer
        context.decodeAudioData(arrayBuffer1, (decodedBuffer) => {
            setAudioBuffer(decodedBuffer);
        });

        // Cleanup on unmount
        return () => {
            context.close();
        };
    }, [buffer]);

    const toggleAudioPlayback = () => {
        if (!audioContext || !audioBuffer) return;

        if (isPlaying) {
            // Stop the audio
            const elapsedTime = audioContext.currentTime - startTime;
            setStartOffset(startOffset + elapsedTime);
            audioSource.stop();
            setIsPlaying(false);
        } else {
            // Play the audio
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0, startOffset % audioBuffer.duration);
            source.startTime = audioContext.currentTime;

            setStartTime(audioContext.currentTime);
            setAudioSource(source);
            setIsPlaying(true);

            // Handle when the audio ends
            source.onended = () => {
                if (isPlaying || audioContext.currentTime >= audioBuffer.duration) {
                    setIsPlaying(false);
                    setStartOffset(0);
                }
            };
        }
    };

    return (
        <span className={styles['play-btn']} onClick={toggleAudioPlayback}><img src={isPlaying ? pause : play} alt={isPlaying ? 'pause' : 'play'} /></span>
    );
};

export default AudioPlayer;
