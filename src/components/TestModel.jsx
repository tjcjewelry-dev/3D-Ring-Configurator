import { MeshRefractionMaterial, useEnvironment, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Matrix4, Quaternion, Vector3 } from "three";
import { ASSETS_BASE } from "../data/assets";
import { colors } from "../data/colors";
import { createMetalMaterial } from "../materials/metal";

function TestModel({ envMap, quality }) {
    const testModel = useGLTF(`/models/blender.glb`);

    const shankMetal = "R";
    const headMetal = "R";

    const metalEnv = useEnvironment({ files: `${ASSETS_BASE}hdri/metal_01.hdr` });

    const shankMetalMaterials = useMemo(() => {
        const colorCombination = colors[shankMetal];
        if (!colorCombination || colorCombination.length === 0) return null;

        const metOutside = createMetalMaterial(metalEnv, colorCombination[0], {
            roughness: 0.25,
            metalness: 0.98,
            envMapIntensity: 1.5,
        });

        const metInside = (colorCombination.length === 1)
            ? metOutside
            : createMetalMaterial(metalEnv, colorCombination[1], {
                roughness: 0.25,
                metalness: 0.98,
                envMapIntensity: 1.5,
            });
        return { metOutside, metInside };
    }, [shankMetal, metalEnv]);

    const headMetalMaterial = useMemo(() => {
        const colorCombination = colors[headMetal];
        if (!colorCombination || colorCombination.length == 0) return null;

        const metal = createMetalMaterial(metalEnv, colorCombination[0], {
            roughness: 0.25,
            metalness: 0.98,
            envMapIntensity: 1.5,
        });

        return metal;
    }, [headMetal, metalEnv]);

    const diamondMeshes = useMemo(() => {
        const diamonds = [];
        [testModel.scene].forEach((scene, index) => {
            scene.updateMatrixWorld(true);

            const invSceneWorld = new Matrix4()
                .copy(scene.matrixWorld)
                .invert();

            scene.traverse((node) => {
                if (node.isMesh && (node?.name.toLowerCase().includes("stone"))) {
                    node.updateWorldMatrix(true, false);

                    const relMatrix = new Matrix4()
                        .copy(invSceneWorld)
                        .multiply(node.matrixWorld);

                    const pos = new Vector3();
                    const quat = new Quaternion();
                    const sca = new Vector3();
                    relMatrix.decompose(pos, quat, sca);

                    diamonds.push({
                        id: node.uuid,
                        geometry: node.geometry.clone(), // Cloning geometry can prevent visibility inheritance issues
                        position: pos,
                        quaternion: quat,
                        scale: sca
                    });
                }
            });
        });
        return diamonds;
    }, [testModel]);

    useEffect(() => {
        if (!testModel || !shankMetalMaterials || !headMetalMaterial) return;

        const applyMaterial = (child) => {
            if (child.isLine || child.isLineSegments || child.type === "LineSegments") {
                child.visible = false;
                return;
            }

            if (!child.isMesh) return;

            const materialSlotName = child?.name?.toLowerCase() ?? "";
            if (materialSlotName.includes("stone") || materialSlotName.includes("sidestone")) {
                child.visible = false;
                return;
            }

            if (materialSlotName === "metal-outside") {
                child.material = shankMetalMaterials.metOutside;
            } else if (materialSlotName === "metal-inside") {
                child.material = shankMetalMaterials.metInside;
            } else if (materialSlotName === "metal-head") {
                child.material = headMetalMaterial;
            } else {
                // 👇 This tells you what's slipping through unhandled
                console.warn(`[RingModel] UNHANDLED material slot: "${materialSlotName}" on mesh "${child.name}"`);
            }

            child.material.name = materialSlotName;
            child.castShadow = true;
            child.receiveShadow = true;
        }

        testModel.scene.traverse(applyMaterial);
        // shankModel.scene.traverse(applyMaterial);
        // headModel.scene.traverse(applyMaterial);

        // markLoaded(`shank-TR-${shankType}`);
        // markLoaded(`head-${headType}-${shape}-${carat}`);

        // let id1, id2;
        // id1 = requestAnimationFrame(() => {
        //     id2 = requestAnimationFrame(() => setReady(true));
        // });

        return () => {
            // cancelAnimationFrame(id1);
            // cancelAnimationFrame(id2);

            diamondMeshes.forEach((d) => {
                if (d.geometry) d.geometry.dispose();
            });
        }

    }, [testModel, shankMetalMaterials, headMetalMaterial, diamondMeshes]);

    return <>
        <primitive object={testModel.scene} />

        {diamondMeshes.map((d) => (
            <mesh
                key={d.id}
                geometry={d.geometry}
                position={d.position}
                quaternion={d.quaternion}
                scale={d.scale}
                castShadow
                receiveShadow
            >
                <MeshRefractionMaterial
                    envMap={envMap}
                    color="#ffffff"
                    ior={2.42}
                    aberrationStrength={0.03}
                    fresnel={1.8}
                    bounces={quality.diamondBounces}        // 11 → 2–3
                    resolution={quality.diamondResolution}  // 2048 → 128–256
                    samples={quality.diamondSamples}        // 8 → 1–2
                    fastChroma={true}                              // was false — enable for perf
                    toneMapped={false}
                    transparent
                    opacity={0.9}
                    side={2}
                    reflectivity={0.3}
                />
            </mesh>
        ))}
    </>
}

export default TestModel;