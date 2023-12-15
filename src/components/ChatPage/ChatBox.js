import React from 'react';
import styles from './ChatPage.module.scss';
import ChatProvider, { useChatContext } from './ChatProvider';
import ChatListItem from './ChatListItem';
import sendImg from './../../assets/images/send.svg';
import avatar from './../../assets/images/avatar.svg';
import stemLogo from './../../assets/images/stem.png'

const ChatBox = () => {
    const { handleChatInput, chatList } = useChatContext();
    const [input, setInput] = React.useState('');
    return (
        <>
            <div className={styles.box}>
                <div  className={styles.avatar}>
                    <img src={avatar} alt="avatar" className='' />
                </div>
                <div className={styles.note}>
                    Note: This is a simulated chat with Jesus using AI.
                </div>
                <div className={styles.chatBoxContainer}>
                    <div className={styles.chatBox}>
                        {
                            chatList.map((e, i) =>
                                <ChatListItem {...e} key={i} />
                            )
                        }
                    </div>
                </div>
            </div>
                <form className={styles.chatInputBox}  onSubmit={(e) => {
                    e.preventDefault();
                    handleChatInput(input);
                }}>
                        <input type='text'  className={styles.chatInput}  onChange={(e) => setInput(e.target.value)} />
                        <button className={styles['send-button']} ><img src={sendImg} alt="Send" /></button>
                        <img src={stemLogo} alt="Powered by STEM"  className={styles['stem-logo']} />
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
