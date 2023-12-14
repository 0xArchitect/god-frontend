import React from 'react';
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <div className={styles.home}>
            <div className={styles['bg-image']}></div>
            <div className={styles.contentContainer}>
                <h2 className={styles.heading}>Come and speak to $GOD</h2>
                <a href="/" className={styles.btn}>Speak to $GOD</a>
            </div>
        </div>
    );
}

export default HomePage;
