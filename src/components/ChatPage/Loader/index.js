import React, { useState, useEffect } from 'react';
import './loader.scss'; // Make sure to create this CSS file
import cross from './../../../assets/images/cross.png';

const Loader = () => {
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDotCount((prevCount) => (prevCount % 2) + 1);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <p className="three-dots-container">
            <span className='animate'>
                <span className={`dot`}>
                    <img src={cross} alt="cross" />
                </span>
                <span className={`dot `}>
                    <img src={cross} alt="cross" />
                </span>
            </span>
        </p>
    );
};

export default Loader;
