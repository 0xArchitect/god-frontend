import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ buffer }) => {
    console.log('buffer', buffer);
    const [audioContext, setAudioContext] = useState(null);
    const [sourceNode, setSourceNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const initializeAudio = async () => {
            try {
                const context = new (window.AudioContext || window.webkitAudioContext)();
                const bufferSource = context.createBufferSource();
                const audioBuffer = await context.decodeAudioData(buffer);

                bufferSource.buffer = audioBuffer;
                bufferSource.connect(context.destination);

                setAudioContext(context);
                setSourceNode(bufferSource);
            } catch (error) {
                console.error('Error initializing audio context:', error);
            }
        };

        initializeAudio();

        return () => {
            if (sourceNode) {
                sourceNode.stop();
            }
        };
    }, [buffer]);

    const togglePlayback = () => {
        if (audioContext && sourceNode) {
            if (isPlaying) {
                sourceNode.stop();
            } else {
                sourceNode.start();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div>
            <button onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default AudioPlayer;
