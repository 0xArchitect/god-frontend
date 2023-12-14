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

const updateStorage = (chatList, chat, d) => {
  const storedData = localStorage.getItem('chat-context');
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (parsedData.length) {
        const data = parsedData;
        if (chatList?.length) data.push(...chatList);

        chatList = data;
      }
    }
    catch (e) { }
  }

  localStorage.setItem('chat-context', JSON.stringify([...chatList, {
    chat: chat,
    chatId: d?.chatId || null,
    result: d?.result || null,
    voice: d?.voice ? createWavFile(d?.voice) : null
  }]));

  if (d?.chatId) {
    localStorage.setItem('chat-id', d?.chatId);
  }
}

export default function ChatProvider({ children }) {
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
        voice: voice ? createWavFile(voice) : null
      }]
    })
  }

  const triggerChat = useCallback(({ chat, chatId }) => {
    if (isLoading) return;

    updateChat({ chat })
    updateStorage(chatList, chat, {})

    setIsLoading(true)
    fetch(`${ENDPOINT}/rest/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat, ...(nextChatId || chatId) && {
          chatId: chatId || nextChatId
        }
      })
    })
      .then((d) => d.json()).then((d) => {
        setIsLoading(false)
        setNextChatId(d.chatId);

        updateChat({ ...d })
        updateStorage(chatList, chat, d)
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
    const storedData = localStorage.getItem('chat-context');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setChatList(parsedData);
      }
      catch (e) { }
    }

    const storedChatId = localStorage.getItem('chat-id') || null;
    if (storedChatId) {
      setNextChatId(storedChatId);
    }

    triggerChat({
      chat: '',
      chatId: storedChatId
    })
  }, []);

  return <Provider value={contextValue}>{children}</Provider>;
}

