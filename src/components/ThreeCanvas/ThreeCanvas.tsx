import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Html, OrbitControls, TransformControls, Text, Float, MeshReflectorMaterial } from "@react-three/drei";
const Scene = () => {
    const cubeRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const sphere = useRef<THREE.Mesh>(null!)

    const { camera, gl } = useThree()

    console.log("camera and gl", camera, gl);


    useFrame((state, delta) => {
        if (cubeRef.current && groupRef.current) {
            cubeRef.current.rotation.y += delta;
            groupRef.current.rotation.y += delta;
        }
    });

    return (
        <>
            <OrbitControls />
            <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={1.5} />


            <group ref={groupRef}>
                <mesh ref={sphere} position-x={-0.9}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        center
                        wrapperClass="label"
                        distanceFactor={5}
                        occlude={[sphere, cubeRef]}
                    // position={[1, 2, 3]}

                    >React</Html>
                </mesh>
                <mesh
                    ref={cubeRef}
                    rotation-y={Math.PI * 0.25}
                    position-x={1.4}
                    scale={1.5}
                >
                    <boxGeometry />
                    <Html
                        center
                        distanceFactor={5}

                    >Three</Html>

                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <TransformControls />


            </group>
            <Float
                speed={4}
                floatIntensity={3}
            >
                <Text
                    position={[0.2, 2, 0]} // <--- Move it to (x=2, y=2, z=0)
                    fontSize={0.4}
                    color="red"
                    maxWidth={4}
                >
                    I Love React Three
                </Text>
            </Float>
            <mesh position-y={-0.9} rotation-x={-Math.PI * 0.5} scale={4}>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.5} />
            </mesh>
        </>
    );
};

const ThreeCanvas = () => {
    return (
        <Canvas style={{ width: "100%", height: "100%" }}>
            <Scene />
        </Canvas>
    );
};

export default ThreeCanvas;
