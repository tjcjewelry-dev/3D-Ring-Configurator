import { Html } from "@react-three/drei";
import { useSceneReady } from "../store/useSceneReady";

function CanvasLoader() {
    const ready = useSceneReady((s) => s.ready);

    // Once ready, render nothing — stays mounted but invisible,
    // avoids the Html unmount flash
    if (ready) return null;

    return (
        <Html
            center
            zIndexRange={[100, 0]}
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#f8f8f8",
                pointerEvents: "none",
            }}
        >
            <img
                src="/logo.png"
                alt="Loading"
                style={{ width: 120, marginBottom: 24, opacity: 0.85 }}
            />
            {/* Pulse ring spinner — no percentage needed */}
            <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "3px solid #e0e0e0",
                borderTop: "3px solid #b08d57",
                animation: "spin 0.9s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Html>
    );
}

export default CanvasLoader;