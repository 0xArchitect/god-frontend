import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import bgMusic from './assets/music.mp3'

const PageContext = createContext({});
const { Provider } = PageContext;


export const usePageContext = () => {
  return useContext(PageContext);
}

export default function PageProvider({ children }) {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = useCallback(() => {
    if (ref.current && !isPlaying) {
      ref?.current?.play();
    }
    else if (ref.current && isPlaying) {
      ref?.current?.stop();
    }
  }, [isPlaying]);

  const startMusicOnBtnClik = useCallback(() => {
    localStorage.removeItem('chat-context');
    localStorage.removeItem('chat-id');

    if (!isPlaying && ref?.current) ref?.current?.play();
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('play', () => {
        setIsPlaying(true);
      });
      ref.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }
  }, [])

  const docClick = useCallback(() => {
    if (!isPlaying) startMusic();
  }, [isPlaying])

  useEffect(() => {
    document.body.addEventListener('click', docClick);
  }, [])

  const contextValue = {
    startMusic,
    startMusicOnBtnClik
  }

  return <Provider value={contextValue}>
    <audio loop style={{ height: 0, width: 0, visibility: 'hidden' }} ref={ref} autoPlay src={bgMusic} controls></audio>
    {children}
  </Provider>;
}

