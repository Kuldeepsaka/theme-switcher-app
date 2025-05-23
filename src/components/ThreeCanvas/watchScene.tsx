import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import Watch from "./Watch";

gsap.registerPlugin(ScrollTrigger);

// Define props type to include `progress`
interface SceneProps {
    progress: number; // The scroll progress value passed as a prop
}

const Scene: React.FC<SceneProps> = ({ progress }) => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(0, 0, 0);
        }
    });

    useGSAP(() => {
        const updateCamPos = () => {
            const positions: [number, number, number][] = [
                [3.5, 2.17, 3.7],
                [3.7, 0.6, 0.7],
                [2.3, 0.87, -4.2],
                [-1.3, 5, 6],
            ];

            if (progress >= 1) {
                const [x, y, z] = positions[positions.length - 1]; // Use the last position if progress is 1 or greater
                if (cameraRef.current) {
                    gsap.to(cameraRef.current.position, {
                        x,
                        y,
                        z,
                        duration: 1,
                        ease: "power3.out",
                    });
                }
            } else {
                const segmentProgress = 1 / 3;
                const segmentIndex = Math.floor(progress / segmentProgress);

                const percentage = (progress % segmentProgress) / segmentProgress;

                const [startX, startY, startZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[segmentIndex + 1];

                // Calculate interpolated position based on progress
                const x = startX + (endX - startX) * percentage;
                const y = startY + (endY - startY) * percentage;
                const z = startZ + (endZ - startZ) * percentage;

                if (cameraRef.current) {
                    gsap.to(cameraRef.current.position, {
                        x,
                        y,
                        z,
                        duration: 0.5,
                        ease: "power3.out",
                    });
                }
            }
        };

        updateCamPos();
    }, [progress]); // Depend on progress for dynamic updates

    return (
        <>
            {/* <OrbitControls /> */}
            <PerspectiveCamera
                ref={cameraRef}
                fov={45}
                near={0.1}
                far={10000}
                makeDefault
                position={[3.5, 2.17, 3.7]} // Default position
            />
            <Environment preset="city" />
            <Watch />
            {/* <axesHelper args={[5]} /> */}
        </>
    );
};

export default Scene;
