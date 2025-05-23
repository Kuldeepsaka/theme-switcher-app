import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Center, useMatcapTexture } from "@react-three/drei";

const Scene1 = () => {
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

    return (
        <>
            <OrbitControls makeDefault />
            <Center>
                <group> {/* Important for perfect centering */}
                    <Text3D
                        font="/fonts/helvetiker_regular.typeface.json"
                        size={0.45}
                        height={0.2}
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.02}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        Hello R3F
                        <meshMatcapMaterial matcap={matcapTexture} />
                    </Text3D>
                </group>
            </Center>

            {[...Array(100)].map((value, index) =>
                <mesh
                    key={index}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    ]}
                    scale={0.2 + Math.random() * 0.2}

                >
                    <torusGeometry args={[1, 0.6, 16, 32]} />
                    <meshMatcapMaterial matcap={matcapTexture} />

                </mesh>

            )}


        </>
    );
};

const ThreeCanvas1 = () => {
    return (
        <Canvas style={{ width: "100%", height: "100%" }}>
            <Scene1 />
        </Canvas>
    );
};

export default ThreeCanvas1;
