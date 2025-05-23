import { Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RootState } from '../../app/store';
import styles from './Header.module.scss';
import logo from '../../assets/react.svg';
import ThemeToggleButton from '../themeToggle/switchTheme';
import { LuMoon } from "react-icons/lu";
import { IoSunny } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const theme = useSelector((state: RootState) => state.theme.mode);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [sticky, setSticky] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef<HTMLDivElement | null>(null);

    const sunRef = useRef(null);
    const moonRef = useRef(null);
    const iconBoxRef = useRef(null);
    const rotationRef = useRef(235); // Always end at 235deg

    useEffect(() => {
        const iconBox = iconBoxRef.current;
        if (iconBox) {
            gsap.set(iconBox, { rotate: rotationRef.current }); // initial setup
        }
    }, []);

    useGSAP(() => {
        const sun = sunRef.current;
        const moon = moonRef.current;
        const iconBox = iconBoxRef.current;

        gsap.killTweensOf([sun, moon, iconBox]);

        // Animate full 360 clockwise and land on 235°
        if (iconBox) {
            gsap.fromTo(iconBox,
                { rotate: rotationRef.current },
                {
                    rotate: rotationRef.current - 360,
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.set(iconBox, { rotate: rotationRef.current }); // reset to exact 235
                    }
                }
            );
        }

        // Helper
        const fadeIcons = (visibleRef: React.RefObject<HTMLElement>, hiddenRef: React.RefObject<HTMLElement>) => {
            const duration = 0.6;
            const ease = 'power2.out';

            gsap.to(visibleRef, { opacity: 1, duration, ease });
            gsap.to(hiddenRef, { opacity: 0, duration, ease });
        };

        // Inside useGSAP
        if (theme === 'light') {
            if (sun && moon) {
                fadeIcons(sun, moon);
            }
        } else {
            if (moon && sun) {
                fadeIcons(moon, sun);
            }
        }

    }, { dependencies: [theme] });






    
    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const handleScroll = () => {
        if (navbarRef.current && window.pageYOffset > navbarRef.current.offsetTop) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // set theme in HTML tag
    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            theme === 'dark' ? 'dark' : 'light'
        );
    }, [theme]);

    // Logo animation
    useGSAP(() => {
        gsap.from(logoRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            ease: 'power2.out',
        });
    }, []);

    // Offcanvas menu animation with timeline
    useGSAP(() => {
        if (showOffcanvas) {
            setTimeout(() => {
                const links = navLinksRef.current?.children;
                if (links && links.length > 0) {
                    const tl = gsap.timeline();
                    tl.from(links, {
                        opacity: 0,
                        x: 30,
                        duration: 0.3,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            }, 100); // delay helps after DOM mount
        }
    }, [showOffcanvas]);

    // Refactor animation to choose correct ref

    return (
        <Navbar
            expand="lg"
            variant={theme}
            bg={theme}
            ref={navbarRef}
            className={`shadow-sm py-4 ${styles.stickyHeader} ${sticky ? styles.sticky : ''}`}
        >
            <Container>
                <Navbar.Brand as={NavLink} to="/" ref={logoRef}>
                    <Image src={logo} alt="Logo" height="40" />
                </Navbar.Brand>

                <div className="d-flex align-items-center gap-2 ms-auto me-0">
                    <div className='d-none d-lg-none d-md-block d-sm-block'>
                        <ThemeToggleButton />
                    </div>
                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar"
                        onClick={handleShowOffcanvas}
                        className="border-0"
                    />
                </div>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    className={`bg-${theme} text-${theme === 'light' ? 'dark' : 'light'}`}
                >
                    <Offcanvas.Header closeButton closeVariant={theme === 'light' ? 'dark' : 'white'}>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 gap-3" ref={navLinksRef}>

                            <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas} end>
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/services" onClick={handleCloseOffcanvas}>
                                Services
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/contact" onClick={handleCloseOffcanvas}>
                                Contact
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/examples" onClick={handleCloseOffcanvas}>
                                Examples
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login" onClick={handleCloseOffcanvas}>
                                Login
                            </Nav.Link>
                            {/* DESKTOP ICONS */}
                            <div className='d-none d-lg-block d-md-none'>
                                <ThemeToggleButton />
                            </div>
                        </Nav>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>
                <div className={styles.iconSec} ref={iconBoxRef}>
                    <div ref={sunRef} className={styles.sunIcon}>
                        <IoSunny size={90} />
                    </div>
                    <div ref={moonRef} className={styles.moonIcon}>
                        <LuMoon size={90} />
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export default Header;