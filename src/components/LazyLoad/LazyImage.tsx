import { useState } from 'react';
import styles from './LazyLoad.module.scss';

interface LazyImageProps {
    src: string;
    alt?: string;
    className?: string;
}

const LazyImage = ({ src, alt = '', className = '' }: LazyImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`${styles.lazyImageWrapper} position-relative`}>
            {!loaded && (
                <div className={styles.shimmerLines}>
                    <div className={`${styles.shimmerLine} ${styles.line1}`} />
                    <div className={`${styles.shimmerLine} ${styles.line2}`} />
                    <div className={`${styles.shimmerLine} ${styles.line3}`} />
                    <div className={`${styles.shimmerLine} ${styles.line4}`} />
                    <div className={`${styles.shimmerLine} ${styles.line5}`} />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`${className} ${styles.lazyImg} ${loaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.4s ease-in-out', width: '100%' }}
            />
        </div>
    );
};

export default LazyImage;
