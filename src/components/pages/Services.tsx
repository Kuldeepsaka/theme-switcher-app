import { Suspense, useRef, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "../ThreeCanvas/watchScene";
import { useGSAP } from "@gsap/react";
import styles from "./Services.module.scss";
gsap.registerPlugin(ScrollTrigger);

function Services() {
    const mainRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    setProgress(self.progress);
                }
            }
        })
            .to(sceneRef.current, {
                ease: "none",
                x: "-25vw",
                y: "100vh",
            })
            .to(sceneRef.current, {
                ease: "none",
                x: "25vw",
                y: "200vh",
            })
            .to(sceneRef.current, {
                ease: "none",
                x: "-25vw",
                y: "300vh",
            });
    }, [mainRef]);

    return (
        <main ref={mainRef} className={styles.main}>
            <Suspense
                fallback={
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black text-white">
                        <Spinner animation="border" variant="light" />
                    </div>
                }
            >
                <section className={`position-relative d-flex justify-content-center align-items-center ${styles.section}`}>

                    <p className="text-center position-absolute top-0 mt-4 fs-1 fw-bold">
                        Apple Watch
                    </p>
                    <p className="text-center position-absolute bottom-0 mb-4 fs-1 fw-bold">
                        Ultra 2
                    </p>

                    <div ref={sceneRef} className="w-100 h-100 text-white">
                        <Canvas>
                            <Scene progress={progress} />
                        </Canvas>
                    </div>
                </section>
                <section className={`position-relative d-flex align-items-center justify-content-evenly ${styles.section}`}>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="ms-auto  text-center px-4">
                                <h2 className="fw-semibold fs-2">
                                    Effortlessly scroll, zoom, and navigate with the re-engineered
                                    Digital Crown, now more precise than ever.
                                </h2>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className={`position-relative d-flex align-items-center justify-content-evenly ${styles.section}`}>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="px-4">
                                <h2 className="fw-semibold fs-2">
                                    Built for adventure, the rugged straps are as tough as you are,
                                    ready for any challenge.
                                </h2>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className={`position-relative d-flex align-items-center justify-content-evenly ${styles.section}`}>
                    <Container>
                        <Row className="align-items-center">
                            <Col md={6} className="ms-auto px-4">
                                <h2 className="fw-semibold fs-2">
                                    The brightest display ever on an Apple Watch, so you can see it
                                    clearly even under the harshest sun.
                                </h2>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Suspense>
        </main>
    );
}

export default Services;
