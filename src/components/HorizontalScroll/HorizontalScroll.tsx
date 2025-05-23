import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./HorizontalScroll.scss";
import Hero from "../Hero/Hero";
import { Col } from "react-bootstrap";
import ThreeCanvas from "../ThreeCanvas/ThreeCanvas";
import ThreeCanvas1 from "../ThreeCanvas/ThreeCanvas1";

gsap.registerPlugin(ScrollTrigger);




const HorizontalScroll = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const panels = gsap.utils.toArray(".panel");

            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".wrapper",
                    start: "top top",
                    end: `+=${100 * panels.length}%`,
                    pin: true,
                    scrub: 0.6,
                    snap(value) {
                        if (value > 0.15 && value < 0.35) {
                            return 0.25;
                        }
                        if (value > 0.65 && value < 0.85) {
                            return 0.75;
                        }
                        return 0; // or some other default value
                    },
                    markers: {
                        startColor: "white",
                        endColor: "white"
                    }
                }
            });
        },
        { scope: wrapperRef } // correct usage of scope
    );

    return (
        <div className="scroll-container" ref={wrapperRef}>
            <div className="section">
                <Hero />
            </div>

            <div className="section wrapper">
                <div className="content">
                    <div className="panel row m-0">
                        <Col className="h-100">
                            <ThreeCanvas />
                        </Col>
                        <Col className="h-100">
                            <ThreeCanvas1 />
                        </Col>
                    </div>

                    <div className="panel panel-2">Panel 2</div>
                    <div className="panel panel-3">Panel 3</div>
                </div>
            </div>

            <div className="section">
                Bottom Content
            </div>
        </div>
    );
};

export default HorizontalScroll;
