import React from 'react';
import styles from './HomePage.module.scss';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className={`${styles.home} container`}>
            <div className='bg-image'></div>
            <div className={styles.contentContainer}>
                <h2 className='heading'>Come and speak to $GOD</h2>
                <Link to="/chat" className='btn'>Speak to $GOD</Link>
            </div>
        </div>
    );
}

export default HomePage;
