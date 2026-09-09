// Scene.jsx

import { OrbitControls, useEnvironment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import RingModel from "./RingModel";
import CanvasLoader from "./CanvasLoader";
import CanvasOverlay from "./CanvasOverlay";
import SelectionWatcher from "./SelectionWatcher";
import { useSceneReady } from "../store/useSceneReady";
import { ASSETS_BASE } from "../data/assets";
import { ACESFilmicToneMapping } from "three";

const IS_MOBILE =
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

const QUALITY = {
    diamondBounces: 6,
    diamondResolution: IS_MOBILE ? 128 : 512,
    diamondSamples: IS_MOBILE ? 1 : 4,
    envResolution: IS_MOBILE ? 512 : 1024,
    shadowMapSize: IS_MOBILE ? 512 : 1024,
    dpr: IS_MOBILE ? [1, 1] : [1, 2],
};

function SceneContent() {
    const ready = useSceneReady((s) => s.ready);
    const controlsRef = useRef();

    const envMap = useEnvironment({
        files: `${ASSETS_BASE}hdri/vr-studio.hdr`,
        resolution: QUALITY.envResolution
    });

    useEffect(() => {
        if (!ready || !controlsRef.current) return;

        // Reset any stuck drag state in OrbitControls
        const canvas = controlsRef.current.domElement;
        if (canvas) {
            canvas.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
            canvas.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true }));
        }
    }, [ready]);

    return (
        <>
            <ambientLight intensity={0.25} />

            <directionalLight
                position={[-10, 12, 25]}
                intensity={0.8}
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
                ref={controlsRef}
                enabled={ready}        // fully disabled while loading
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
        </>
    );
}

function Scene() {
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <CanvasOverlay />

            <CanvasLoader />

            <Canvas
                id="model-viewer-canvas"
                camera={{ position: [0, 75.5, 0], fov: 50 }}
                dpr={QUALITY.dpr}
                performance={{ min: 0.5, max: 1, debounce: 200 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",

                    toneMapping: ACESFilmicToneMapping,
                    toneMappingExposure: 0.45
                }}
                style={{ touchAction: "none" }}
                shadows
            >
                <SelectionWatcher />
                <Suspense fallback={null}>
                    <SceneContent />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default Scene;