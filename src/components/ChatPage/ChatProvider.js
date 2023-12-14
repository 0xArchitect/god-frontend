import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ChatContext = createContext({});
const { Provider } = ChatContext;

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
    fetch('https://83f8-2405-201-1f-1161-9c9b-2da4-cf3b-73af.ngrok-free.app/rest/chat', {
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
    triggerChat({ chat })
  }, [])

  const contextValue = {
    handleChatInput,
    chatList,
    nextChatId
  }

  useEffect(() => {
    // triggerChat({
    //   chat: ''
    // })
  }, [])
  return <Provider value={contextValue}>{children}</Provider>;
}

