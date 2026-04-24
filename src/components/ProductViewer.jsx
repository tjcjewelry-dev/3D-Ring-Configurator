import { ArrowLeft, Maximize2, RotateCw } from 'lucide-react';
import Scene from './Scene';

export default function ProductViewer() {
  return (
    <div className="h-full flex flex-col relative">
      <Scene />
      {/* <div className="className absolute inset-0">
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center text-sm font-medium text-zinc-600">
          <ArrowLeft size={16} className="mr-2" /> Back
        </button>
          <div></div>
          <button className="p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white shadow-sm transition-all">
            <Maximize2 size={18} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative">
          <img
            src="https://www.jamesallen.com/scout/images/engagement-rings/round-cut.png"
            alt="Ring"
            className="max-w-full h-auto max-h-[50vh] lg:max-h-[60vh] object-contain"
          />
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <button className="bg-white/90 border border-zinc-200 px-6 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-white flex items-center">
                <span className="w-2 h-2 bg-zinc-300 rounded-full mr-2"></span> View Matching Band
              </button>
            </div>
            <div className="hidden lg:flex items-center text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              <RotateCw size={12} className="mr-2" /> Drag to rotate
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}