import React from 'react';
import logo from './../../assets/images/dummy-logo.png'

import twitter from './../../assets/images/twitter.svg'
import telegram from './../../assets/images/telegram.svg'
import vector from './../../assets/images/vector.svg'

import avatar from './../../assets/images/avatar.svg';
import stemLogo from './../../assets/images/stem.png'


import { Link } from "react-router-dom";
import styles from './InfoPage.module.scss';

const InfoPage = () => {

    return (
        <div className={styles.info}>
            <div className='bg-image'></div>
            <div className={styles.header}>
                <div className={styles.menu} >
                    <Link to="/">Home</Link>
                    <Link to="/info" className={styles.active}>Info</Link>
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
            <div className={styles.box}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar" className='' />
                </div>
                <div className={styles.chatSocial}>
                    <div className={`${styles.social} ${styles.mobileVisible}`}>
                        <Link className='social-link' to="https://twitter.com/" target='_blank' title='Twitter' > <img src={twitter} alt="Twitter" /> </Link>
                        <Link className='social-link' to="https://web.telegram.org/" target='_blank' title='Telegram' > <img src={telegram} alt="Telegram" /> </Link>
                        <Link className='social-link' to="https://google.com" target='_blank' title='ChatGPT'> <img src={vector} alt="logo a" /> </Link>
                    </div>
                </div>
                <section>
                    <h1>About</h1>
                    <p className={styles.textContainer}>In a collaborative effort with StemTech, .STEM_ emerges as innovative convergence of artificial intelligence, machine learning, and large language models (LLMs). Together using there neural networks, we will spearhead a paradigm shift in conversational AI, fundamentally reconceptualizing the dynamics of interaction.</p>
                </section>
                <section className={styles.tokenomics}>
                    <h1>Tokenomics</h1>
                    <div className={styles.gridContainer}>
                        <div>
                            <h2>5%</h2>
                            <h3>Buy Tax</h3>
                        </div>
                        <div>
                            <h2>5%</h2>
                            <h3>Sell Tax</h3>
                        </div>
                        <div className={styles.supply}>
                            <h2>Supply</h2>
                            <h3>1,000,000,000</h3>
                            <p>2% team</p>
                            <p>2% advisory</p>
                            <p>2% marketing</p>
                        </div>
                    </div>
                </section>
                <section className={styles.roadmap}>
                    <h1>Roadmap</h1>
                    <ul className={styles['roadmap-list']}>
                        <li>
                            <span>Phase 1</span>
                            <div>
                                <p>Voice Protocol V1 launch</p>
                                <p>AI Text in chat</p>
                                <p>AI Voice notes in chat</p>
                                <p>Voice to Voice VC</p>
                                <p>V1 test and data collection</p>
                            </div>
                        </li>
                        <li>
                            <span>Phase 2</span>
                            <div>
                                <p>AI to host twitter spaces</p>
                                <p>Voice Protocol V2</p>
                                <p>Marketing push</p>
                                <p>T1 and T2 influencers</p>
                                <p>Additional clones added</p>
                            </div>
                        </li>
                        <li >
                            <span>Phase 3</span>
                            <div>
                                <p>V3 Launch</p>
                                <p>Simultaneous VC launch</p>
                                <p>Exchange listings CEX/DEX</p>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
            <div className={`container ${styles['form-container']}`}>
                <Link to="https://www.stem.computer/" target="_blank">
                    <img src={stemLogo} alt="Powered by STEM" className={styles['stem-logo']} />
                </Link>
            </div>
        </div>
    );
}

export default InfoPage;
