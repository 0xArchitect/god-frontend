import React from 'react';
import styles from './HomePage.module.scss';
import { Link } from "react-router-dom";
import { usePageContext } from '../../PageProvider';

const HomePage = () => {
    const { startMusic } = usePageContext();

    return (
        <div className={`${styles.home} container`}>
            <div className='bg-image'></div>
            <div className={styles.contentContainer}>
                <h2 className='heading'>Come and speak to $GOD</h2>
                <Link onClick={() => startMusic()} to="/chat" className='btn'>Speak to $GOD</Link>
            </div>
        </div>
    );
}

export default HomePage;
