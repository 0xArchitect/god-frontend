import React from 'react';
import styles from './ChatPage.module.scss';

import logo from './../../assets/images/dummy-logo.png'
import avatar from './../../assets/images/avatar.svg'

import twitter from './../../assets/images/twitter.svg'
import telegram from './../../assets/images/telegram.svg'
import vector from './../../assets/images/vector.svg'

import { Link } from "react-router-dom";
import ChatBox from './ChatBox';


const ChatPage = () => {
    return (
        <div className={styles.chat}>
            <div className='bg-image'></div>
            <div className={styles.header}>
                <div>
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div>
                    <img src={avatar} alt="avatar" className='' />
                </div>
                <div>
                    <div className={styles.social}>
                        <Link to="https://twitter.com/" target='_blank' > <img src={twitter} alt="Twitter" /> </Link>
                        <Link to="https://web.telegram.org/" > <img src={telegram} alt="Telegram" /> </Link>
                        <Link to="https://google.com" > <img src={vector} alt="logo a" /> </Link>
                    </div>
                </div>
            </div>
            <ChatBox />
        </div>
    );
}

export default ChatPage;
