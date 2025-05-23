import styles from './Example.module.scss';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Example1 = () => {
    useGSAP(() => {
        const splitContainer = document.querySelector(`.${styles['splitText']} h2`);

        if (splitContainer) {
            const text = new SplitType(splitContainer as HTMLElement, { types: ['chars', 'words'] });
            gsap.from(text.chars, {
                y: 100,
                autoAlpha: 0,
                stagger: {
                    amount: 0.3,
                    from: 'random',
                    repeat: -1,
                    yoyo: true,
                },
            });
        }
    }, []);

    return (
        <div className={styles['themed-section']}>
            <div className="position-relative w-100 h-100 overflow-hidden">
                <div className={styles['overlay']}></div>
                <div className="d-flex py-5 justify-content-center align-items-center">
                    <div className={styles['splitText']}>
                        <h2>
                            Welcome to my website
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Example1;
