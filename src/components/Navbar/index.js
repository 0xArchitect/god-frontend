import styles from './Navbar.module.scss';
import React from "react";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles['nav-list']}>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;