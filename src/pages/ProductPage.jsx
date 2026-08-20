import { useEffect, useMemo, useState } from "react";
import ProductViewer from "../components/ProductViewer";
import Navbar from "../components/Navbar";
import TabNavigation from "../components/TabNavigation";
import LoadingGate from "../components/LoadingGate";
import CustomizerPanel from "../components/CustomizerPanel";
import { useNavigate, useParams } from "react-router-dom";
import { useSelections } from "../store/useSelections";
import { options } from "../data/options";
import { BASE_PATH_START } from "../data/assets";

const convToValue = param => param?.trim()?.toUpperCase();

export default function ProductPage() {
    const {
        parentName:mainPath,
        shankType,
        shape,
        carat,
        headType,
        headMetal,
        shankMetal,
        quiltMetal,
        initialized,
        updateStack
    } = useSelections();

    const {
        parentName,
        shank: shankParam,
        head: headParam,
        metal: metalParam
    } = useParams();

    const navigate = useNavigate();

    const stack = useMemo(() => {
        if (!parentName) navigate("/404")

        const headDetails = headParam?.trim()?.split("-");
        const metalDetails = metalParam?.trim()?.split("-");

        return {
            parentName,
            shankType: convToValue(shankParam) ?? options.shankTypes[0].conv,
            shape: convToValue(headDetails?.[0]) ?? options.shapes[0].conv,
            carat: convToValue(headDetails?.[1]) ?? options.carats[0].conv,
            headType: convToValue(headDetails?.[2]) ?? options.headTypes[0].conv,
            headMetal: convToValue(metalDetails?.[0]) ?? options.headMetalColors[0].conv,
            shankMetal: convToValue(metalDetails?.[1]) ?? options.shankMetalColors[0].conv,
            quiltMetal: convToValue(metalDetails?.[2]) ?? options.quiltColors[0].conv
        };
    }, [parentName, shankParam, headParam, metalParam]);

    // URL -> Zustand
    useEffect(() => {

        if (!stack) {
            navigate("/404", { replace: true });
            return;
        }

        updateStack(stack);

    }, [stack, updateStack, navigate]);

    // Zustand -> URL
    useEffect(() => {
        if(!initialized) return;

        const headStr = `${shape}-${carat}-${headType}`;
        const metalStr = `${headMetal}-${shankMetal}-${quiltMetal}`;

        const newPath = `/product/${mainPath}/${shankType}/${headStr}/${metalStr}`;
        const currentPath = window.location.pathname;
        
        if(currentPath !== BASE_PATH_START + newPath) {
            navigate(newPath, { replace: true });
        }
    }, [initialized, shape, carat, headType, headMetal, shankMetal, quiltMetal, mainPath, shankType, navigate]);

    const [activeTab, setActiveTab] = useState('Diamond');

    if (!stack || !initialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 flex flex-col lg:flex-row relative">
                {/* Left Side: Fixed/Sticky Canvas */}
                <div className="w-full h-[500px] md:h-[600px] lg:w-3/5 lg:sticky lg:top-0 lg:h-[calc(100vh-64px)] bg-[#F8F8F8]">
                    <ProductViewer />
                </div>

                {/* Right Side: Scrollable Customizer */}
                <div className="w-full lg:w-2/5 bg-white lg:min-h-screen">
                    <div className="lg:hidden">
                        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>

                    <div className="p-4 lg:p-8 lg:pb-32 scroll-smooth">
                        <LoadingGate>
                            <CustomizerPanel activeTab={activeTab} />
                        </LoadingGate>
                    </div>
                </div>
            </main>

            {/* <ActionBar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
        </div>
    );
}