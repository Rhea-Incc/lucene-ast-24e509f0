import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

interface GlassParticlesProps {
  variant?: "hero" | "about";
  className?: string;
}

const Particles = ({ count = 220, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) => {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("hsl(185, 100%, 55%)");
    const c2 = new THREE.Color("hsl(260, 80%, 70%)");
    const c3 = new THREE.Color("hsl(35, 100%, 65%)");
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.current.y * 0.2, 0.04);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, mouse.current.x * 0.1, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const GlassOrb = ({ mouse, position, scale = 1, color }: { mouse: React.MutableRefObject<{ x: number; y: number }>; position: [number, number, number]; scale?: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, position[0] + mouse.current.x * 0.6, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, position[1] - mouse.current.y * 0.4, 0.05);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.6}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.4}
          temporalDistortion={0.1}
          transmission={1}
          roughness={0.05}
          ior={1.4}
          color={color}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ variant }: { variant: "hero" | "about" }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useFrame(({ pointer }) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x, 0.06);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y, 0.06);
  });

  gl.setClearColor(0x000000, 0);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#22e0ff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#a855f7" />
      <Suspense fallback={null}>
        <Environment preset="night" />
        {variant === "hero" ? (
          <>
            <GlassOrb mouse={mouse} position={[-2.6, 0.4, 0]} scale={1.1} color="#22e0ff" />
            <GlassOrb mouse={mouse} position={[2.4, -0.3, -1]} scale={0.85} color="#a855f7" />
            <GlassOrb mouse={mouse} position={[0, 1.8, -2]} scale={0.55} color="#ffb347" />
          </>
        ) : (
          <>
            <GlassOrb mouse={mouse} position={[-2.2, 0.8, 0]} scale={0.9} color="#22e0ff" />
            <GlassOrb mouse={mouse} position={[2.6, -0.5, -0.5]} scale={1.0} color="#a855f7" />
          </>
        )}
        <Particles count={variant === "hero" ? 280 : 200} mouse={mouse} />
      </Suspense>
    </>
  );
};

const GlassParticles = ({ variant = "hero", className = "" }: GlassParticlesProps) => {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Scene variant={variant} />
      </Canvas>
    </div>
  );
};

export default GlassParticles;
