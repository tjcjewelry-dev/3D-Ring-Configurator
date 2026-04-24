import { OrbitControls, useEnvironment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import RingModel from "./RingModel";
import { Suspense } from "react";
import CanvasLoader from "./CanvasLoader";
import SelectionWatcher from "./SelectionWatcher";
import { ASSETS_BASE } from "../data/assets";
import CanvasOverlay from "./CanvasOverlay";
import { useSceneReady } from "../store/useSceneReady";

const IS_MOBILE =
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

const QUALITY = {
    diamondBounces: IS_MOBILE ? 6 : 11,      // was 4 → 6, more internal reflections
    diamondResolution: IS_MOBILE ? 128 : 512,  // was 256 → 512, sharper facets
    diamondSamples: IS_MOBILE ? 1 : 4,      // was 2 → 4, cleaner sampling
    envResolution: IS_MOBILE ? 128 : 256,
    shadowMapSize: IS_MOBILE ? 512 : 1024,
    dpr: IS_MOBILE ? [1, 1] : [1, 2], // was 1.5 → 2 for retina sharpness
};

function SceneContent() {
    const ready = useSceneReady((state) => state.ready);

    const envMap = useEnvironment({
        files: `${ASSETS_BASE}hdri/vr-studio.hdr`,
        resolution: QUALITY.envResolution,
    });

    return <>
        <ambientLight intensity={0.4} />

        <directionalLight
            position={[-10, 12, 25]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={100}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
        />

        <group position={[0, 10.5, 0]}>
            <RingModel envMap={envMap} quality={QUALITY} />
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[150, 150]} />
            <shadowMaterial opacity={0.03} />
        </mesh>

        <OrbitControls
            enabled={ready}
            enablePan={false}
            minDistance={45}
            maxDistance={65}
            minPolarAngle={0}
            maxPolarAngle={Math.PI * 0.5}
            zoomSpeed={0.5}
            rotateSpeed={0.65}
            enableDamping
            dampingFactor={0.07}
            target={[0, 10.5, 0]}
        />

    </>;
}

function Scene() {
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <CanvasOverlay />

            <Canvas
                camera={{
                    position: [0, 75.5, 0], // top view (Y-axis)
                    fov: 50
                }}
                dpr={QUALITY.dpr}
                performance={{ min: 0.5 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{
                    touchAction: "none",
                }}
                shadows
            >
                <CanvasLoader />
                <SelectionWatcher />

                <Suspense fallback={null}>
                    <SceneContent />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Scene;