import { useSceneReady } from "../store/useSceneReady";

function LoadingGate({ children }) {
    const ready = useSceneReady((s) => s.ready);

    return (
        <div style={{ position: "relative" }}>
            {children}
            {!ready && (
                <div style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "all",
                    cursor: "wait",
                    zIndex: 10,
                    background: "rgba(255,255,255,0.5)",
                }} />
            )}
        </div>
    );
}

export default LoadingGate;