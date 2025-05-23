// src/components/Hero/HeroCanvas.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface StarFieldProps {
    starColor: THREE.Color;
}

function StarField({ starColor }: StarFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Create geometry & initial colors only once
    const { geometry, initialColors } = useMemo(() => {
        const starCount = 5000;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            // random positions
            positions[i * 3] = Math.random() * 2000 - 1000;
            positions[i * 3 + 1] = Math.random() * 2000 - 1000;
            positions[i * 3 + 2] = Math.random() * 2000 - 1000;

            // initial color (white)
            colors[i * 3] = 1;
            colors[i * 3 + 1] = 1;
            colors[i * 3 + 2] = 1;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        return { geometry: geo, initialColors: colors };
    }, []);

    // Update vertex colors on theme change
    useEffect(() => {
        if (!pointsRef.current) return;
        const cols = geometry.attributes.color as THREE.BufferAttribute;
        for (let i = 0; i < initialColors.length; i += 3) {
            cols.array[i] = starColor.r;
            cols.array[i + 1] = starColor.g;
            cols.array[i + 2] = starColor.b;
        }
        cols.needsUpdate = true;
    }, [starColor, geometry.attributes.color, initialColors]);

    // Material: use vertexColors
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            size: 1.5,
            sizeAttenuation: true,
            vertexColors: true,
        });
    }, []);

    return <points ref={pointsRef} geometry={geometry} material={material} />;
}

const HeroCanvas = () => {
    const theme = useSelector((state: RootState) => state.theme.mode);
    // white stars on dark, black stars on light
    const starColor = useMemo(
        () => new THREE.Color(theme === 'dark' ? 0xffffff : 0x000000),
        [theme]
    );

    return (
        <Canvas
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
            camera={{ position: [0, 0, 400], fov: 75 }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <StarField starColor={starColor} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    );
};

export default HeroCanvas;
