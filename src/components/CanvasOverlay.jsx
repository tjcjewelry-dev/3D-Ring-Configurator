import { useSceneReady } from "../store/useSceneReady";

function CanvasOverlay() {
    const ready = useSceneReady((s) => s.ready);
    if (ready) return null;

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "all",
            background: "#f8f8f8",
            touchAction: "none"
        }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        />
    );
}

export default CanvasOverlay;