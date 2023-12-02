import styles from './button.module.scss';
import React from "react";
import cn from 'clsx'

const Button = ({ children, className, ...rest }) => {
    return (
        <button className={cn(styles.root, className)} {...rest} >
            {children}
        </button>
    );
}

export default Button;