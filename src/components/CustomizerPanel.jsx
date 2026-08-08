import { RotateCcw } from 'lucide-react';
import OptionSelector from './OptionSelector';
import { options } from '../data/options';
import { ASSETS_BASE } from '../data/assets';

const Section = ({ title, number, children, id, activeTab }) => (
    <div className={`mb-8 ${activeTab !== id && activeTab !== 'Summary' ? 'hidden lg:block' : ''}`}>
        <div className="flex items-center space-x-3 mb-6">
            <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-400">{number}</span>
            <h2 className="text-sm font-bold uppercase tracking-widest">{title}</h2>
        </div>
        <div className="pl-11 border-l ml-4 border-zinc-100 pb-2">
            {children}
        </div>
    </div>
);

export default function CustomizerPanel({ activeTab }) {
    return (
        <div>
            <div className="hidden lg:flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif">Customize Your Ring</h1>
                <button className="text-zinc-400 hover:text-black"><RotateCcw size={18} /></button>
            </div>

            <Section title="Center Diamond" number="1" id="Diamond" activeTab={activeTab}>
                <OptionSelector
                    label="Select Carat Size"
                    options={options.carats}
                    inpName={"carat"}
                    type="pill"
                />
                <OptionSelector
                    label="Select Shape"
                    options={options.shapes}
                    inpName="shape"
                    folderPath={ASSETS_BASE + "imgs/shapes"}
                    type="icon"
                />
            </Section>

            <Section title="Ring Band" number="2" id="Band" activeTab={activeTab}>
                <OptionSelector
                    label="Select Shank Size"
                    options={options.shankTypes}
                    inpName="shankType"
                    folderPath={ASSETS_BASE + "imgs/shanks"}
                    type="icon"
                />
                <OptionSelector
                    label="Select Metal"
                    options={options.shankMetalColors}
                    inpName="shankMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
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
                />
                <OptionSelector
                    label="Select Metal"
                    options={options.headMetalColors}
                    inpName="headMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
                />
            </Section>

            <Section title="Quilt Setting" number="4" id="Quilt" activeTab={activeTab}>
                <OptionSelector
                    label="Select Color"
                    options={options.quiltColors}
                    inpName="quiltMetal"
                    folderPath={ASSETS_BASE + "imgs/metals"}
                    type="swatch"
                />
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