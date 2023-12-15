import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ audioBuffer }) => {
    console.log('audioBuffer', audioBuffer);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioBuffer) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createBufferSource();

        // Assuming audioBuffer is a Float32Array representing the audio data
        const buffer = audioContext.createBuffer(1, audioBuffer.length, audioContext.sampleRate);
        buffer.getChannelData(0).set(audioBuffer);

        source.buffer = buffer;
        source.connect(audioContext.destination);

        // Play the audio
        source.start();

        // Cleanup when the component unmounts
        return () => {
            // source.stop();
            // audioContext.close();
        };
    }, [audioBuffer]);

    return (
        <div>
            <audio ref={audioRef} controls />
        </div>
    );
};

export default AudioPlayer;
