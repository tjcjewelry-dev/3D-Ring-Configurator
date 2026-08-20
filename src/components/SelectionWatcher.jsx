import { useEffect } from "react";
import { useSelections } from "../store/useSelections";
import { useSceneReady } from "../store/useSceneReady";

function SelectionWatcher() {
    const setReady  = useSceneReady((s) => s.setReady);
    const isLoaded  = useSceneReady((s) => s.isLoaded);
    
    const shankType = useSelections((s) => s.shankType);
    const headType  = useSelections((s) => s.headType);
    const shape     = useSelections((s) => s.shape);
    const carat     = useSelections((s) => s.carat);

    useEffect(() => {
        const shankKey = `shank-SK-${shankType}`;
        const headKey  = `head-${headType}-${shape}-${carat}`;

        const bothCached = isLoaded(shankKey) && isLoaded(headKey);
        if (!bothCached) {
            setReady(false);
        }

    }, [shankType, headType, shape, carat]);

    return null;
}

export default SelectionWatcher;