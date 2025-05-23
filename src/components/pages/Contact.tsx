import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import Lenis from 'lenis';
import styles from './Contact.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef(null);

    // Initialize Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis();
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, []);

    // GSAP animations using useGSAP
    useGSAP(() => {
        const splitTypes = document.querySelectorAll('.reveal-type');

        splitTypes.forEach((el) => {
            const text = new SplitType(el as HTMLElement, { types: 'chars' });

            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                },
                scaleY: 0,
                y: -20,
                transformOrigin: 'top',
                duration: 0.4,
                stagger: 0.1,
            });
        });
    }, { scope: containerRef }); // scope ties GSAP to this part of the DOM

    return (
        <div ref={containerRef} className={`row m-0 p-0 ${styles.main}`}>
            <section>
                <h1>Scroll down with Awesomeness Animations</h1>
            </section>
            <section>
                <p className="reveal-type">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </section>
            <section>
                <p className="reveal-type">
                    It is a long established fact that a reader will be distracted by the readable content
                </p>
            </section>
            <section>
                <p className="reveal-type">
                    It looks like readable English. Many desktop publishing packages and web page editors
                </p>
            </section>
            <section>
                <h3>Add other content.....!</h3>
            </section>
        </div>
    );
};

export default Contact;
