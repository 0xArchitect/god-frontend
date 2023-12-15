import React, { useEffect, useRef } from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';
import sendImg from './../../assets/images/send.svg';
import avatar from './../../assets/images/avatar.svg';
import stemLogo from './../../assets/images/stem.png'
import cross from './../../assets/images/cross.png';
import Loader from './Loader';

const ChatBox = () => {
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
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar" className='' />
                </div>
                <div className={styles.note}>
                    Note: This is a simulated chat with $Lord using AI.
                </div>
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
                        <Loader />
                    </div>

                </div>
            </div>
            <form
                className={styles.chatInputBox}
                ref={ref}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChatInput(inputValue);
                    if (ref?.current) ref.current.reset();
                    setInput('')
                }}
            >
                <textarea id='ta' placeholder='Write a message' type='text' className={styles.chatInput} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleChatInput(inputValue);
                            if (ref?.current) ref.current.reset();
                            setInput('')
                        }
                    }
                    }
                ></textarea>
                <button className={styles['send-button']} ><img src={sendImg} alt="Send" /></button>
                <img src={stemLogo} alt="Powered by STEM" className={styles['stem-logo']} />
            </form>
            {/* </div> */}
        </>
    );
}

export const ChatBoxContainer = () => {
    return <ChatProvider>
        <ChatBox />
    </ChatProvider>
}

export default ChatBoxContainer;
