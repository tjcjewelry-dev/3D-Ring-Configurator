import { MeshRefractionMaterial, useEnvironment, useGLTF } from "@react-three/drei";
import { useSelections } from "../store/useSelections";
import { useCallback, useEffect, useMemo } from "react";
import { createMetalMaterial } from "../materials/metal";
import { colors } from "../data/colors";
import { Matrix4, Quaternion, Vector3 } from "three";
import { useSceneReady } from "../store/useSceneReady";
import { ASSETS_BASE } from "../data/assets";

function extractDiamonds(scenes) {
    const diamonds = [];
    for (const scene of scenes) {
        scene.updateMatrixWorld(true);
        const invScene = new Matrix4().copy(scene.matrixWorld).invert();
        scene.traverse((node) => {
            if (!node.isMesh || !node?.name?.toLowerCase().includes("stone")) return;

            node.updateWorldMatrix(true, false);
            const rel = new Matrix4().copy(invScene).multiply(node.matrixWorld);
            const pos = new Vector3();
            const quat = new Quaternion();
            const sca = new Vector3();
            rel.decompose(pos, quat, sca);
            diamonds.push({ id: node.uuid, geometry: node.geometry.clone(), position: pos, quaternion: quat, scale: sca });
        });
    }
    return diamonds;
}

function DiamondMeshes({ diamonds, envMap, quality }) {
    if (!diamonds?.length) return null;
    return diamonds.map((d) => (
        <mesh
            key={d.id}
            geometry={d.geometry}
            position={d.pos}
            quaternion={d.quat}
            scale={d.sca}
            castShadow
            receiveShadow
        >
            <MeshRefractionMaterial
                envMap={envMap}
                color="#ffffff"
                ior={2.42}
                aberrationStrength={0.03}
                fresnel={1.8}
                bounces={quality.diamondBounces}
                resolution={quality.diamondResolution}
                samples={quality.diamondSamples}
                fastChroma
                toneMapped={false}
                transparent
                opacity={0.9}
                side={2}
                reflectivity={0.3}
            />
        </mesh>
    ));
}

function RingModel({ envMap, quality }) {
    const styleNo = useSelections((s) => s.styleNo);
    if(!styleNo) return;

    const setReady = useSceneReady((state) => state.setReady);
    const markLoaded = useSceneReady((s) => s.markLoaded);


    const shankMetal = useSelections((s) => s.shankMetal);
    const shankType = useSelections((s) => s.shankType);
    const headMetal = useSelections((s) => s.headMetal);
    const quiltMetal = useSelections((s) => s.quiltMetal);
    const viewMatchingBand = useSelections((s) => s.viewMatchingBand);
    const { carat, shape, headType } = useSelections((s) => s);


    const shankModel = useGLTF(`/new-models/${styleNo}/TR-${shankType}.glb`);
    const headModel = useGLTF(`/new-models/${styleNo}/${headType}-${shape}-${carat}.glb`);
    const bandModel = useGLTF(`/new-models/${styleNo}/BAND-${shankType}.glb`);

    const metalEnv = useEnvironment({ files: `${ASSETS_BASE}hdri/metal_01.hdr` });

    // compute metal materials
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

    const quiltMetalMaterial = useMemo(() => {
        const colorCombination = colors[quiltMetal];
        if (!colorCombination || colorCombination.length == 0) return null;

        const metal = createMetalMaterial(metalEnv, colorCombination[0], {
            roughness: 0.25,
            metalness: 0.98,
            envMapIntensity: 1.5,
        });

        return metal;
    }, [quiltMetal, metalEnv]);

    const diamondMeshes = useMemo(() => extractDiamonds([shankModel.scene, headModel.scene]), [shankModel, headModel]);

    const bandDiamondMeshes = useMemo(() => viewMatchingBand ? extractDiamonds([bandModel.scene]) : null, [viewMatchingBand, bandModel]);

    const applyMaterial = useCallback((child) => {
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

        if (materialSlotName === "quilt" || materialSlotName === "quilt-metal") {
            child.material = quiltMetalMaterial;
        } else if (materialSlotName === "metal-outside") {
            child.material = shankMetalMaterials.metOutside;
        } else if (materialSlotName === "metal-inside") {
            child.material = shankMetalMaterials.metInside;
        } else if (materialSlotName === "metal-head" || materialSlotName === "metal-haed") {
            child.material = headMetalMaterial;
        } else {
            return;
        }

        if(child.material) {
            child.material.name = materialSlotName;
            child.castShadow = true;
            child.receiveShadow = true;
        }

    }, [shankMetalMaterials, headMetalMaterial, quiltMetalMaterial]);

    // apply materials to the shank
    useEffect(() => {
        if (!shankModel || !headModel || !shankMetalMaterials || !headMetalMaterial) {
            setReady(false);
            return;
        };

        shankModel.scene.traverse(applyMaterial);
        headModel.scene.traverse(applyMaterial);

        if (viewMatchingBand) {
            bandModel.scene.traverse(applyMaterial);
            markLoaded(`band-${shankType}`);
        }

        markLoaded(`shank-TR-${shankType}`);
        markLoaded(`head-${headType}-${shape}-${carat}`);


        let id1, id2;
        id1 = requestAnimationFrame(() => {
            id2 = requestAnimationFrame(() => setReady(true));
        });

        return () => {
            cancelAnimationFrame(id1);
            cancelAnimationFrame(id2);

            diamondMeshes.forEach((d) => d.geometry?.dispose());
            bandDiamondMeshes?.forEach((d) => d.geometry?.dispose());
        }

    }, [shankModel, headModel, bandModel, applyMaterial, diamondMeshes, bandDiamondMeshes, viewMatchingBand, shankType, headType, shape, carat, shankMetalMaterials, headMetalMaterial, setReady, markLoaded]);

    return <>
        <primitive object={shankModel.scene} />
        <primitive object={headModel.scene} />
        {viewMatchingBand && <primitive object={bandModel.scene} />}

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

        {viewMatchingBand && bandDiamondMeshes.map((d) => (
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
    </>;
}

export default RingModel;