import React, {useEffect} from 'react';
import styles from './ChatPage.module.scss';

import logo from './../../assets/images/dummy-logo.png'

import twitter from './../../assets/images/twitter.svg'
import telegram from './../../assets/images/telegram.svg'
import vector from './../../assets/images/vector.svg'


import { Link } from "react-router-dom";
import ChatBox from './ChatBox';

const ChatPage = () => {

    const checkHeightAndScroll = () => {
        if (document.documentElement.scrollHeight > window.innerHeight) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        // Check initially on load
        checkHeightAndScroll();

        // Set up an event listener for window resize
        const handleResize = () => {
            checkHeightAndScroll();
        };

        window.addEventListener('resize', handleResize);

        // Set up a MutationObserver to observe DOM changes
        const observer = new MutationObserver(mutations => {
            checkHeightAndScroll();
        });

        observer.observe(document.body, {
            childList: true, // observe direct children
            subtree: true, // and lower descendants too
            attributes: false,
            characterData: false
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    
    return (
        <div className={styles.chat}>
            <div className='bg-image'></div>
            <div className={styles.header}>
                {/* <div className={styles.logo} >
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div> */}
                <div className={`${styles.menu} ${styles.isMenuDesktop}`} >
                    <Link to="/" className={styles.active}>Home</Link>
                    <Link to="/info" >Info</Link>
                </div>
                {/* <div>
                    <img src={avatar} alt="avatar" className='' />
                </div> */}
                <div>
                    <div className={styles.social}>
                        <Link className='social-link' to="https://twitter.com/" target='_blank' title='Twitter' > <img src={twitter} alt="Twitter" /> </Link>
                        <Link className='social-link' to="https://web.telegram.org/" target='_blank' title='Telegram' > <img src={telegram} alt="Telegram" /> </Link>
                        <Link className='social-link' to="https://google.com" target='_blank' title='ChatGPT'> <img src={vector} alt="logo a" /> </Link>
                    </div>
                </div>
            </div>
            <ChatBox />
            {/* <div className='container relative'>
            
            </div> */}
        </div>
    );
}

export default ChatPage;
