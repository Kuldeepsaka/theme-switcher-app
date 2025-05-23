import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './commonCard.module.scss';

interface AnimatedCardProps {
    children?: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children }) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = innerRef.current;
        if (!el) return;

        const tl = gsap.timeline({ paused: true });

        tl.to(el, {
            scale: 1.03,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power3.out',
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, { scope: innerRef });

    return (
        <div className="card-custom">
            <div ref={innerRef} className="card-inner">
                <Card>
                    {children ? (
                        children
                    ) : (
                        <>
                            <Card.Img
                                variant="top"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVreuIL7YFIhOLpMK0HDOcgbFTH9MDoB5neyMoDWZzL4iFRQg_dI4J9sQQTCcmUx7L55c&usqp=CAU"
                            />
                            <Card.Body>
                                <Card.Title>Modern Card</Card.Title>
                                <Card.Text>
                                    Smooth animated card using GSAP without shrink issues!
                                </Card.Text>
                            </Card.Body>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default AnimatedCard;
