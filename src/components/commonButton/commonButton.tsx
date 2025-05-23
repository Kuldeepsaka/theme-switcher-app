// src/components/CommonButton/CommonButton.tsx
import React from 'react';
import styles from './CommonButton.module.scss';

interface CommonButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function CommonButton({
    onClick,
    children,
    className = '',
}: CommonButtonProps) {

    return (
        <button className={`${styles.commonBtn} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
