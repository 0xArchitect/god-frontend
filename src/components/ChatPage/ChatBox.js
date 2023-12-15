import React, { useRef } from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';
import sendImg from './../../assets/images/send.svg';
import avatar from './../../assets/images/avatar.svg';
import stemLogo from './../../assets/images/stem.png'
import cross from './../../assets/images/cross.png';

const ChatBox = () => {
    const { handleChatInput, chatList, isLoading } = useChatContext();
    const [input, setInput] = React.useState('');
    const ref = useRef(null)
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
                                <ChatListItem {...e} key={i} />
                            )
                        }
                        {isLoading && <span className={styles.loader}>
                        <img src={cross} alt="Powered by STEM" />
                    </span>}
                    </div>
                    
                </div>
            </div>
            <form
                className={styles.chatInputBox}
                ref={ref}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleChatInput(input);
                    if (ref?.current) ref.current.reset();
                }}
            >
                <textarea placeholder='Write a message' type='text' className={styles.chatInput} onChange={(e) => setInput(e.target.value)} ></textarea>
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
