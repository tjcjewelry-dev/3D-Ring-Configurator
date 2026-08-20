// import { Html } from "@react-three/drei";
import { useSceneReady } from "../store/useSceneReady";

function CanvasLoader() {
    const ready = useSceneReady((s) => s.ready);
    if (ready) return null;

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f8f8",
                pointerEvents: "all",
                touchAction: "none",
                userSelect: "none",
            }}
            // Swallow everything — nothing reaches OrbitControls beneath
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseMove={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
        >
            {/* <img
                src="/logo.png"
                alt="Loading"
                style={{ width: 120, marginBottom: 24, opacity: 0.85 }}
            /> */}
            <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "3px solid #e0e0e0",
                borderTop: "3px solid #b08d57",
                animation: "spin 0.9s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default CanvasLoader;