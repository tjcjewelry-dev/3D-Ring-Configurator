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

function getMetalColor(metalType, body, paramValue) {
    const metalColorOptions = options['metalTypes'][metalType][body];
    return metalColorOptions?.find(color => color.conv == paramValue)?.conv ?? metalColorOptions[0].conv;
}

export default function ProductPage() {
    const {
        parentName:mainPath,
        shankType,
        shape,
        carat,
        metalType,
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

        const metalType = convToValue(metalDetails?.[0]) || Object.keys(options["metalTypes"])[0];
        const shape = convToValue(headDetails?.[0]) ?? options.shapes[0].conv;
        let carat = convToValue(headDetails?.[1]) ?? options.carats[0].conv;

        carat = (carat === '2_5' && shape === 'C') ? options.carats[0].conv : carat;

        return {
            parentName,
            shankType: convToValue(shankParam) ?? options.shankTypes[0].conv,
            shape,
            carat,
            headType: convToValue(headDetails?.[2]) ?? options.headTypes[0].conv,
            metalType: metalType,
            headMetal: getMetalColor(metalType, "head", convToValue(metalDetails?.[1])),
            shankMetal: getMetalColor(metalType, "shank", convToValue(metalDetails?.[2])),
            quiltMetal: getMetalColor(metalType, "quilt", convToValue(metalDetails?.[3]))
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
        const metalStr = `${metalType}-${headMetal}-${shankMetal}-${quiltMetal}`;

        const newPath = `/product/${mainPath}/${shankType}/${headStr}/${metalStr}`;
        const currentPath = window.location.pathname;
        
        if(currentPath !== BASE_PATH_START + newPath) {
            navigate(newPath, { replace: true });
        }
    }, [initialized, shape, carat, metalType, headType, headMetal, shankMetal, quiltMetal, mainPath, shankType, navigate]);

    const [activeTab, setActiveTab] = useState('Diamond');

    if (!stack || !initialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col font-serif">
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