// src/components/Hero/Hero.tsx
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Hero.module.scss';
import { Image } from 'react-bootstrap';
import HeroImg from '../../assets/banner.svg';
import HeroCanvas from './HeroCanvas';
import CommonButton from '../commonButton/commonButton';



gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
    const theme = useSelector((state: RootState) => state.theme.mode);
    const heroRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top 80%',
                }
            });

            // Animate heading, paragraph, button with stagger
            tl.from(`.${styles.heroText} h1`, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .from(`.${styles.heroText} p`, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.4')
                .from(`.${styles.heroText} button`, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                }, '-=0.3');

            // Optionally animate the image in after text
            tl.from(`.${styles.heroImage}`, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8');
        }, heroRef);

        return () => ctx.revert();
    }, { scope: heroRef });

    const handleClick = () => {
        // Add your logic here
        console.log('Button clicked!');
    };


    return (
        <section className={`${styles.heroSection} ${styles[theme]}`} ref={heroRef}>

            {/* Three.js Canvas Background */}
            <HeroCanvas />

            <div className={`${styles.heroContainer} container p-0`}>
                <div className={styles.heroText}>
                    <h1>Designed to be Private.</h1>
                    <p>Track your habits and activities. All in one timeline.</p>

                    <CommonButton className={styles.heroBtn} onClick={handleClick}>Order Now</CommonButton>

                </div>
                <div className={styles.heroImage}>
                    <Image src={HeroImg} alt="Tech" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
