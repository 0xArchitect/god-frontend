import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ChatContext = createContext({});
const { Provider } = ChatContext;

const ENDPOINT = 'https://83f8-2405-201-1f-1161-9c9b-2da4-cf3b-73af.ngrok-free.app';

export const useChatContext = () => {
  return useContext(ChatContext);
}

function createWavFile(binaryData) {
  const blob = new Blob([binaryData], { type: 'audio/mpeg' });
  return URL.createObjectURL(blob);
}

export default function ChatProvider({ children }) {
  const [chatList, setChatList] = useState([{
    chat: ''
  }]);
  const [nextChatId, setNextChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerChat = useCallback(({ chat }) => {
    if (isLoading) return;

    setIsLoading(true)
    fetch(`${ENDPOINT}/rest/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat, ...nextChatId && {
          chatId: nextChatId
        }
      })
    })
      .then((d) => d.json()).then((d) => {
        setIsLoading(false)
        setNextChatId(d.chatId);
        localStorage.setItem('chat-context', JSON.stringify([...chatList, {
          chat: chat,
          chatId: d.chatId,
          result: d.result,
          voice: createWavFile(d.voice)
        }]));

        setChatList((prev) => {
          return [...prev, {
            chat: chat,
            chatId: d.chatId,
            result: d.result,
            voice: createWavFile(d.voice)
          }]
        })
      }).catch((e) => {
        setIsLoading(false)
      });
  }, [nextChatId, isLoading])

  const handleChatInput = useCallback((chat) => {
    if (isLoading) return;
    triggerChat({ chat })
  }, [isLoading])

  const contextValue = {
    handleChatInput,
    chatList,
    nextChatId
  }

  useEffect(() => {
    triggerChat({
      chat: ''
    })
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem('chat-context');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setChatList(parsedData);
      }
      catch (e) { }
    }

  }, []);

  return <Provider value={contextValue}>{children}</Provider>;
}

