import { RotateCcw } from 'lucide-react';
import OptionSelector, { Engraving } from './OptionSelector';
import { options } from '../data/options';
import { ASSETS_BASE } from '../data/assets';
import { useSelections } from '../store/useSelections';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, number, children, id, activeTab, classes='' }) => (
    <div className={`mb-8 ${activeTab !== id && activeTab !== 'Summary' ? 'hidden lg:block' : ''} ${classes}`}>
        <div className="flex items-center space-x-3 mb-6">
            <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-400">{number}</span>
            <h2 className="text-sm font-bold uppercase tracking-widest">{title}</h2>
        </div>
        <div className="pl-3 md:pl-11 border-l ml-4 border-zinc-100 pb-2 ">
            {children}
        </div>
    </div>
);

export default function CustomizerPanel({ activeTab }) {
    const shape = useSelections(state => state.shape);
    const metalType = useSelections(state => state.metalType);
    const navigate = useNavigate();

    const caratOptions = useMemo(() => {
        const excludes = options?.excludes?.[`shape-${shape}`]?.carats;
        if (!excludes || excludes?.length === 0) return options.carats;

        return options.carats.filter((opt) => !excludes.includes(opt.conv));
    }, [shape, options]);

    const metalTypes = Object.keys(options.metalTypes);
    const metalColorOptions = useMemo(() => options.metalTypes[metalType], [metalType, options]);

    return (
        <div>
            <div className="hidden lg:flex justify-between items-center mb-2">
                <h1 className="text-3xl font-serif">A.Jaffe Hand French Pave</h1>
                <button type="button" className="text-zinc-400 hover:text-black" onClick={() => navigate(`/product/344`)}><RotateCcw size={18} /></button>
            </div>
            <div className="hidden lg:flex justify-between items-center mb-6">
                <p className="text-sm font-serif text-xs text-zinc-500 text-justify">
                    Many pavé settings are described as hand set, but the setting itself is often already formed before the diamonds are added. A.JAFFE French Pavé is different. Every prong is individually carved by hand around each diamond using a traditional hand graver. This painstaking craftsmanship creates an exceptionally refined surface, a brighter polish, and extraordinary brilliance that mass produced pavé simply cannot replicate.
                </p>
            </div>

            <Section title="Center Diamond" number="1" id="Diamond" activeTab={activeTab}>
                <OptionSelector
                    label="Select Carat Size"
                    options={caratOptions}
                    inpName={"carat"}
                    type="pill"
                    scrollRequired={true}
                />
                <OptionSelector
                    label="Select Shape"
                    options={options.shapes}
                    inpName="shape"
                    folderPath={ASSETS_BASE + "imgs/shapes"}
                    type="icon"
                    scrollRequired={true}
                />
            </Section>

            <Section title="Ring Band" number="2" id="Band" activeTab={activeTab}>
                <OptionSelector
                    label="Select Shank Size"
                    options={options.shankTypes}
                    inpName="shankType"
                    folderPath={ASSETS_BASE + "imgs/shanks"}
                    type="icon"
                    scrollRequired={true}
                />
                <OptionSelector
                    label="Select Metal"
                    options={metalTypes}
                    inpName="metalType"
                    type="pill"
                />
                <OptionSelector
                    label="Select Color"
                    options={metalColorOptions.shank}
                    inpName="shankMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
                    scrollRequired={true}
                />
                <OptionSelector
                    label="Select Size"
                    options={options.ringSizes}
                    inpName="ringSize"
                    type="select"
                />
                <Engraving
                    label="Engraving"
                    engravingFonts={options.engravingFonts}
                />
            </Section>

            <Section title="Head Setting" number="3" id="Head" activeTab={activeTab}>
                <OptionSelector
                    label="Select Head Type"
                    options={options.headTypes}
                    inpName="headType"
                    folderPath={ASSETS_BASE + "imgs/prongs"}
                    textRequired={false}
                    type="icon"
                    scrollRequired={true}
                />
                <OptionSelector
                    label="Select Color"
                    options={metalColorOptions.head}
                    inpName="headMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
                    scrollRequired={true}
                />
            </Section>

            <Section title="Quilt" number="4" id="Quilt" activeTab={activeTab}>
                <OptionSelector
                    label="Select Color"
                    options={metalColorOptions.quilt}
                    inpName="quiltMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
                    scrollRequired={true}
                />
            </Section>

            <Section title="Details" number="5" id="Details" activeTab={activeTab} classes={"lg:hidden"}>
                <div className="lg:flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-serif">A.Jaffe Hand French Pave</h1>
                </div>
                <div className="lg:flex justify-between items-center mb-6">
                    <p className="text-sm font-serif text-xs text-zinc-500 text-justify">
                        Many pavé settings are described as hand set, but the setting itself is often already formed before the diamonds are added. A.JAFFE French Pavé is different. Every prong is individually carved by hand around each diamond using a traditional hand graver. This painstaking craftsmanship creates an exceptionally refined surface, a brighter polish, and extraordinary brilliance that mass produced pavé simply cannot replicate.
                    </p>
                </div>
            </Section>

            {/* <div className="mt-12 bg-[#FBFBFB] p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-white border border-zinc-100 rounded-md p-1">
                        <img src="https://www.jamesallen.com/scout/images/engagement-rings/round-cut.png" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase">Summary</p>
                        <h3 className="text-xs font-bold leading-relaxed mt-1">Round 1.0 ct | Pavé Band<br />4 Prong Setting | 14K White Gold</h3>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-sm">$3,280.00</p>
                    </div>
                </div>
                <button className="w-full flex justify-between items-center text-[10px] font-bold uppercase text-zinc-500 pt-4 border-t">
                    View Price Breakdown <ChevronDown size={14} />
                </button>
            </div> */}
        </div>
    );
}