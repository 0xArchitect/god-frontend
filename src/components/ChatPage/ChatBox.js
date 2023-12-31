import React, { useEffect, useRef } from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';
import sendImg from './../../assets/images/send.svg';
import avatar from './../../assets/images/avatar.svg';
import stemLogo from './../../assets/images/stem.png'
import cross from './../../assets/images/cross.png';
import Loader from './Loader';
import twitter from './../../assets/images/twitter.svg'
import telegram from './../../assets/images/telegram.svg'
import vector from './../../assets/images/vector.svg'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ChatBox = () => {
    let location = useLocation();
    const { handleChatInput, chatList, isLoading } = useChatContext();
    const [inputValue, setInput] = React.useState('');
    const ref = useRef(null)

    useEffect(() => {
        if (inputValue?.trim().length == 0) {
            var textarea = document.getElementById('ta');
            var cleanedContent = textarea.value.replace(/(\r\n|\n|\r)/gm, '');
            textarea.value = cleanedContent;
        }
    }, [inputValue])
    return (
        <>
            <div className={styles.box}>
                <div className={`${styles.avatar} avatar`}>
                    <img src={avatar} alt="avatar" className='' />
                </div>
                <div className={styles.chatSocial}>
                    <div className={styles.menu} >
                        <Link className={`${location.pathname == "/" && styles.active} ${styles.navLink}`} to="/">Home</Link>
                        <Link to="/info" className={styles.navLink}>Info</Link>
                    </div>
                    <div className={styles.social}>
                        <Link className='social-link' to="https://twitter.com/" target='_blank' title='Twitter' > <img src={twitter} alt="Twitter" /> </Link>
                        <Link className='social-link' to="https://web.telegram.org/" target='_blank' title='Telegram' > <img src={telegram} alt="Telegram" /> </Link>
                        <Link className='social-link' to="https://google.com" target='_blank' title='ChatGPT'> <img src={vector} alt="logo a" /> </Link>
                    </div>
                </div>
                {/* <div className={styles.note}>
                    Note: This is a simulated chat with GOD using AI.
                </div> */}
                <div className={styles.chatBoxContainer}>
                    <div className={styles.chatBox}>
                        {
                            chatList.map((e, i) =>
                                <ChatListItem index={i} {...e} key={i} />
                            )
                        }
                        {/* {isLoading && <span className={styles.loader}>
                            <img src={cross} alt="Powered by STEM" />
                            <img src={cross} alt="Powered by STEM" />
                        </span>} */}
                        {isLoading && <Loader />}
                        {/* <Loader /> */}
                    </div>

                </div>
            </div>
            <div className={`container ${styles['form-container']}`}>
                <form
                    className={styles.chatInputBox}
                    ref={ref}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (inputValue.trim()) { // Check if inputValue is not just whitespace
                            handleChatInput(inputValue);
                        }
                        if (ref?.current) ref.current.reset();
                        setInput('')
                    }}
                >
                    <textarea id='ta' placeholder='Write a message' type='text' className={styles.chatInput} onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                if (inputValue.trim()) { // Check if inputValue is not just whitespace
                                    handleChatInput(inputValue);
                                    if (ref?.current) ref.current.reset();
                                    setInput('')
                                }
                            }
                        }
                        }
                    ></textarea>
                    <button className={styles['send-button']} ><img src={sendImg} alt="Send" /></button>
                </form>
                <div className={`container ${styles['form-container']}`}>
                    <Link to="https://www.stem.computer/" target="_blank">
                        <img src={stemLogo} alt="Powered by STEM" className={styles['stem-logo']} />
                    </Link>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export const ChatBoxContainer = () => {
    return <ChatProvider>
        <ChatBox />
        {/* <div className='container'>
            <img src={stemLogo} alt="Powered by STEM" className={styles['stem-logo']} />
        </div> */}
    </ChatProvider>
}

export default ChatBoxContainer;
