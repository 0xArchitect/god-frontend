import React, { useRef, useEffect } from 'react';
import * as lamejs from 'lamejs';

const AudioPlayer = ({ binaryData }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const decodeAndPlayAudio = async () => {
            const audioBuffer = await decodeAudioData(binaryData, audioContext);
            const mp3Data = convertToMp3(audioBuffer, audioContext);
            playMp3(mp3Data);
        };

        decodeAndPlayAudio();

        return () => {
            audioContext.close();
        };
    }, [binaryData]);

    const decodeAudioData = async (binaryData, audioContext) => {
        return new Promise((resolve, reject) => {
            const arrayBuffer = binaryData.slice(binaryData.byteOffset, binaryData.byteOffset + binaryData.byteLength);

            audioContext.decodeAudioData(
                arrayBuffer,
                (buffer) => resolve(buffer),
                (error) => reject(error)
            );
        });
    };

    const convertToMp3 = (audioBuffer, audioContext) => {
        const numChannels = audioBuffer.numberOfChannels;
        const samples = audioBuffer.getChannelData(0);
        const mp3encoder = new lamejs.Mp3Encoder(numChannels, audioContext.sampleRate, 128);
        const mp3Data = [];

        for (let i = 0; i < samples.length; i += 1152) {
            const sampleChunk = samples.subarray(i, i + 1152);
            const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
            if (mp3buf.length > 0) {
                mp3Data.push(new Int8Array(mp3buf));
            }
        }

        const mp3buf = mp3encoder.flush();
        if (mp3buf.length > 0) {
            mp3Data.push(new Int8Array(mp3buf));
        }

        return new Blob(mp3Data, { type: 'audio/mp3' });
    };

    const playMp3 = (mp3Data) => {
        const url = URL.createObjectURL(mp3Data);
        audioRef.current.src = url;
        audioRef.current.play();
    };

    return (
        <div>
            <h1>Binary to MP3 Audio Player</h1>
            <audio ref={audioRef} controls />
        </div>
    );
};

export default AudioPlayer;
