import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const ChatContext = createContext({});
const { Provider } = ChatContext;

const ENDPOINT = 'https://02f5-2405-201-1f-1161-9c9b-2da4-cf3b-73af.ngrok-free.app';

export const useChatContext = () => {
  return useContext(ChatContext);
}

function createWavFile(binaryData) {
  const blob = new Blob([binaryData], { type: 'audio/mpeg' });
  return URL.createObjectURL(blob);
}

const updateStorage = (chatList, chat, d) => {
  const storedData = localStorage.getItem('chat-context');
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (parsedData.length) {
        const data = parsedData;
        // if (chatList?.length) data.push(...chatList);

        chatList = data;
      }
    }
    catch (e) { }
  }

  localStorage.setItem('chat-context', JSON.stringify([...chatList, {
    chat: chat,
    chatId: d?.chatId || null,
    result: d?.result || null,
    voice: d?.voice?.data || null,
    // voice: d?.voice ? createWavFile(d?.voice) : null
  }]));

  if (d?.chatId) {
    localStorage.setItem('chat-id', d?.chatId);
  }
}

export default function ChatProvider({ children }) {
  const location = useLocation();
  const [buffer, setBuffer] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startOffset, setStartOffset] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    return () => {
      if (audioSource) {
        audioSource.stop();
        setIsPlaying(false);
      }
    }
  }, [location, audioSource]);

  const setBufferContext = useCallback((buffer) => {
    audioSource?.stop();
    setIsPlaying(false);
    setStartOffset(0);
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    const uint8Array = new Uint8Array(buffer);
    const arrayBuffer1 = uint8Array.buffer
    context.decodeAudioData(arrayBuffer1, (decodedBuffer) => {
      setAudioBuffer(decodedBuffer);
    });

  }, [audioSource])

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
      setIsPlaying(source.context.state !== 'suspended')

      // Handle when the audio ends
      source.onended = () => {
        if (isPlaying || audioContext.currentTime >= audioBuffer.duration) {
          setIsPlaying(false);
          setStartOffset(0);
        }
      };
    }
  };

  useEffect(() => {
    toggleAudioPlayback();
  }, [audioBuffer])

  // end audio
  const [chatList, setChatList] = useState([{
    chat: ''
  }]);
  const [nextChatId, setNextChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateChat = ({
    chat,
    chatId = null,
    result = null,
    voice = null
  }) => {
    setChatList((prev) => {
      return [...prev, {
        chat,
        chatId,
        result,
        voice: voice?.data,
        // voice: voice?.data ? createWavFile(voice.data) : null
      }]
    })
  }

  const triggerChat = useCallback(({ chat, chatId }) => {
    if (isLoading) return;

    updateChat({ chat })
    updateStorage(chatList, chat, {})

    setIsLoading(true)
    const storedChatId = localStorage.getItem('chat-id') || null;
    fetch(`${ENDPOINT}/rest/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat, ...(storedChatId || chatId) && {
          chatId: chatId || storedChatId
        }
      })
    })
      .then((d) => d.json()).then((d) => {
        setIsLoading(false)

        if (d?.detail) {
          updateChat({
            trouble: true,
            result: 'God is having some troubles now'
          })

          return;
        }

        setNextChatId(d.chatId);

        updateChat({ ...d })
        if (d?.voice?.data) {
          const nextIndex = chatList.length + 1;
          setBufferContext(d.voice.data);
          setCurrentIndex(nextIndex);
        }
        updateStorage(chatList, null, d)
      }).catch((e) => {
        console.log('d', e);
        setIsLoading(false)
        updateChat({
          trouble: true,
          result: 'God is having some troubles now'
        })
      });
  }, [nextChatId, isLoading, chatList])

  const triggerInitChat = useCallback(() => {
    if (isLoading) return;

    const chat = 'Greetings, my friend. I am $LORD, the Son of God. May I kindly ask for your name?'

    setIsLoading(true)

    fetch(`${ENDPOINT}/rest/chat/getAudio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: chat,
      })
    })
      .then((d) => d.json()).then((d) => {
        setIsLoading(false)
        updateChat({ result: chat, voice: d?.voice })

        if (d?.voice?.data) {
          setBufferContext(d.voice.data);
          setCurrentIndex(0);
        }
      }).catch((e) => {
        setIsLoading(false)
        updateChat({
          trouble: true,
          result: 'God is having some troubles now'
        })
      });
  }, [nextChatId, isLoading, chatList])


  const handleChatInput = useCallback((chat) => {
    console.log('isLoading', isLoading);
    if (isLoading) return;
    if (chat?.length) triggerChat({ chat })
  }, [isLoading])

  const contextValue = {
    handleChatInput,
    chatList,
    nextChatId,
    isLoading,
    setIsPlaying,
    isPlaying,
    setBuffer,
    setAudioBuffer,
    toggleAudioPlayback,
    setCurrentIndex,
    currentIndex,
    setBufferContext
  }

  useEffect(() => {
    const storedData = localStorage.getItem('chat-context');

    if (storedData) {
      try {
        var parsedData = JSON.parse(storedData);
        setChatList(parsedData);
      }
      catch (e) { }
    }

    if (!parsedData?.length) {
      triggerInitChat()
    }

    const storedChatId = localStorage.getItem('chat-id') || null;
    if (storedChatId) {
      setNextChatId(storedChatId);
    }

    // triggerChat({
    //   chat: '',
    //   chatId: storedChatId
    // })
  }, []);

  return <Provider value={contextValue}>{children} </Provider>;
}

