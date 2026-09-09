// Scene.jsx

import {
    OrbitControls,
    useEnvironment,
    Html,
} from "@react-three/drei";

import { Canvas, useThree } from "@react-three/fiber";

import {
    Suspense,
    useEffect,
    useRef,
} from "react";

import * as THREE from "three";

import RingModel from "./RingModel";
import CanvasLoader from "./CanvasLoader";
import CanvasOverlay from "./CanvasOverlay";
import SelectionWatcher from "./SelectionWatcher";

import { useSceneReady } from "../store/useSceneReady";
import { ASSETS_BASE } from "../data/assets";


// ============================================================
// DEBUG
// ============================================================

const DEBUG = true;


// ============================================================
// DEVICE / QUALITY
// ============================================================

const IS_MOBILE =
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

const QUALITY = {
    diamondBounces: 4,
    diamondResolution: IS_MOBILE ? 128 : 512,
    diamondSamples: IS_MOBILE ? 1 : 4,
    envResolution: IS_MOBILE ? 512 : 1024,
    shadowMapSize: IS_MOBILE ? 512 : 1024,
    dpr: IS_MOBILE ? [1, 1] : [1, 2],
};


// ============================================================
// DEBUG HELPERS
// ============================================================

function DebugHelpers({
    cameraRef,
    lightRef,
    controlsRef,
}) {
    const { scene, camera } = useThree();

    useEffect(() => {
        if (!DEBUG) return;

        const helpers = [];

        // ----------------------------------------------------
        // XYZ AXES
        // ----------------------------------------------------

        const axes = new THREE.AxesHelper(20);

        axes.name = "DEBUG_AXES";

        scene.add(axes);
        helpers.push(axes);


        // ----------------------------------------------------
        // GRID
        // ----------------------------------------------------

        const grid = new THREE.GridHelper(
            100,
            20
        );

        grid.position.set(
            0,
            -0.5,
            0
        );

        grid.name = "DEBUG_GRID";

        scene.add(grid);
        helpers.push(grid);


        // ----------------------------------------------------
        // CAMERA HELPER
        // ----------------------------------------------------

        const cameraHelper =
            new THREE.CameraHelper(camera);

        cameraHelper.name =
            "DEBUG_CAMERA_HELPER";

        scene.add(cameraHelper);

        helpers.push(cameraHelper);


        // ----------------------------------------------------
        // LIGHT HELPER
        // ----------------------------------------------------

        let lightHelper = null;

        if (lightRef?.current) {
            lightHelper =
                new THREE.DirectionalLightHelper(
                    lightRef.current,
                    5
                );

            lightHelper.name =
                "DEBUG_LIGHT_HELPER";

            scene.add(lightHelper);

            helpers.push(lightHelper);
        }


        // ----------------------------------------------------
        // SHADOW CAMERA HELPER
        // ----------------------------------------------------

        let shadowHelper = null;

        if (lightRef?.current) {
            shadowHelper =
                new THREE.CameraHelper(
                    lightRef.current.shadow.camera
                );

            shadowHelper.name =
                "DEBUG_SHADOW_CAMERA";

            scene.add(shadowHelper);

            helpers.push(shadowHelper);
        }


        // ----------------------------------------------------
        // CLEANUP
        // ----------------------------------------------------

        return () => {
            helpers.forEach((helper) => {
                scene.remove(helper);

                if (helper.dispose) {
                    helper.dispose();
                }
            });
        };

    }, [scene, camera, cameraRef, lightRef, controlsRef]);


    // --------------------------------------------------------
    // CAMERA / LIGHT / TARGET INFO
    // --------------------------------------------------------

    return (
        <>
            {DEBUG && cameraRef?.current && (
                <Html
                    position={[
                        cameraRef.current.position.x,
                        cameraRef.current.position.y,
                        cameraRef.current.position.z,
                    ]}
                    distanceFactor={15}
                    style={{
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(0,0,0,0.75)",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                        }}
                    >
                        📷 CAMERA
                        <br />
                        X: {cameraRef.current.position.x.toFixed(1)}
                        <br />
                        Y: {cameraRef.current.position.y.toFixed(1)}
                        <br />
                        Z: {cameraRef.current.position.z.toFixed(1)}
                    </div>
                </Html>
            )}

            {DEBUG && lightRef?.current && (
                <Html
                    position={[
                        lightRef.current.position.x,
                        lightRef.current.position.y,
                        lightRef.current.position.z,
                    ]}
                    distanceFactor={15}
                    style={{
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(255,150,0,0.85)",
                            color: "#000",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                        }}
                    >
                        💡 LIGHT
                        <br />
                        X: {lightRef.current.position.x.toFixed(1)}
                        <br />
                        Y: {lightRef.current.position.y.toFixed(1)}
                        <br />
                        Z: {lightRef.current.position.z.toFixed(1)}
                    </div>
                </Html>
            )}

            {DEBUG && controlsRef?.current && (
                <Html
                    position={[
                        controlsRef.current.target.x,
                        controlsRef.current.target.y,
                        controlsRef.current.target.z,
                    ]}
                    distanceFactor={15}
                    style={{
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                    }}
                >
                    <div
                        style={{
                            background: "rgba(0,150,255,0.85)",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                        }}
                    >
                        🎯 TARGET
                        <br />
                        X: {controlsRef.current.target.x.toFixed(1)}
                        <br />
                        Y: {controlsRef.current.target.y.toFixed(1)}
                        <br />
                        Z: {controlsRef.current.target.z.toFixed(1)}
                    </div>
                </Html>
            )}

            {DEBUG && (
                <axesHelper
                    args={[20]}
                />
            )}
        </>
    );
}


// ============================================================
// SCENE CONTENT
// ============================================================

function SceneContent() {

    const ready =
        useSceneReady((s) => s.ready);

    const controlsRef =
        useRef();

    const cameraRef =
        useRef();

    const lightRef =
        useRef();


    // --------------------------------------------------------
    // ENVIRONMENT
    // --------------------------------------------------------

    const envMap = useEnvironment({
        files: `${ASSETS_BASE}hdri/ext/gem1.exr`,
        resolution: QUALITY.envResolution,
    });


    // --------------------------------------------------------
    // RESET ORBIT CONTROLS
    // --------------------------------------------------------

    useEffect(() => {

        if (
            !ready ||
            !controlsRef.current
        ) {
            return;
        }

        const canvas =
            controlsRef.current.domElement;

        if (canvas) {

            canvas.dispatchEvent(
                new PointerEvent(
                    "pointerup",
                    { bubbles: true }
                )
            );

            canvas.dispatchEvent(
                new PointerEvent(
                    "pointercancel",
                    { bubbles: true }
                )
            );
        }

    }, [ready]);


    // --------------------------------------------------------
    // LIGHT TARGET
    // --------------------------------------------------------

    useEffect(() => {

        if (!lightRef.current) {
            return;
        }

        // Make the directional light
        // point directly at the ring.

        lightRef.current.target.position.set(
            0,
            10.5,
            0
        );

        lightRef.current.target.updateMatrixWorld();

    }, []);


    // --------------------------------------------------------
    // SCENE
    // --------------------------------------------------------

    return (
        <>
            {/* ============================================
                AMBIENT LIGHT
            ============================================ */}

            {/* <ambientLight
                intensity={1}
            /> */}


            {/* ============================================
                MAIN DIRECTIONAL LIGHT
            ============================================ */}

            <directionalLight
                ref={lightRef}
                position={[
                    -10, 12, 25
                ]}
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

            <spotLight
                position={[5, 45, 25]}
                intensity={1.4}
            />


            {/* ============================================
                RING
            ============================================ */}

            <group
                position={[
                    0,
                    10.5,
                    0
                ]}
            >
                <RingModel
                    envMap={envMap}
                    quality={QUALITY}
                />
            </group>


            {/* ============================================
                FLOOR
            ============================================ */}

            <mesh
                rotation={[
                    -Math.PI / 2,
                    0,
                    0
                ]}
                position={[
                    0,
                    -0.5,
                    0
                ]}
                receiveShadow
            >
                <planeGeometry
                    args={[150, 150]}
                />

                <shadowMaterial
                    opacity={0.03}
                />
            </mesh>


            {/* ============================================
                ORBIT CONTROLS
            ============================================ */}

            <OrbitControls
                ref={controlsRef}

                enabled={ready}

                enablePan={false}

                // minDistance={45}
                // maxDistance={65}

                // minPolarAngle={0}
                // maxPolarAngle={
                //     Math.PI * 0.5
                // }

                zoomSpeed={0.5}
                rotateSpeed={0.65}

                enableDamping

                dampingFactor={0.07}

                target={[
                    0,
                    10.5,
                    0
                ]}
            />


            {/* ============================================
                DEBUG
            ============================================ */}

            {DEBUG && (
                <DebugHelpers
                    cameraRef={cameraRef}
                    lightRef={lightRef}
                    controlsRef={controlsRef}
                />
            )}
        </>
    );
}


// ============================================================
// MAIN SCENE
// ============================================================

function Scene() {

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >

            <CanvasOverlay />

            <CanvasLoader />

            <Canvas
                camera={{
                    position: [
                        0,
                        75.5,
                        0
                    ],
                    fov: 50,
                }}

                dpr={QUALITY.dpr}

                performance={{
                    min: 0.5
                }}

                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference:
                        "high-performance",
                }}

                style={{
                    touchAction: "none"
                }}

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