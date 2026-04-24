// import { useProgress } from "@react-three/drei";
import { useSelections } from "../store/useSelections";

export default function OptionSelector({ label, options, type, inpName, textRequired=true, folderPath = null }) {
  const currentSelection = useSelections((state) => state[inpName]);
  const updateField = useSelections((state) => state.updateField);
  // const { active: modelActive } = useProgress();
  const modelActive = true;

  const pointerClass = !modelActive 
  ? "cursor-not-allowed pointer-events-none opacity-50" 
  : "cursor-pointer pointer-events-auto opacity-100";

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter mb-3">{label}</p>

      <div className={`flex flex-wrap gap-3`}>
        {options.map((opt, ind) => {
          const val = type === 'icon' ? opt.name : opt;
          const optionId = `${inpName}-${ind + 1}-${opt.conv}`;
          const isChecked = opt.conv == currentSelection;

          if (type === 'pill') {
            return (
              <label
                key={optionId}
                htmlFor={optionId}
                className={`px-6 py-2.5 rounded-md text-sm border transition-all ${pointerClass} select-none ${isChecked ? 'border-lumina-gold bg-white shadow-sm font-bold' : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-400'
                  }`}
                title={"Carat " + opt.name}
              >
                <span>{opt.name}</span>
                <input type="radio" name={inpName} id={optionId} checked={isChecked} onChange={() => updateField(inpName, opt.conv)} hidden />
              </label>
            );
          }

          if (type === 'icon') {
            return (
              <label
                key={optionId}
                htmlFor={optionId}
                className={`size-fit flex flex-col items-center group ${pointerClass} select-none`}
              >
                <div className={`size-[75px] aspect-square flex items-center justify-center rounded-md border transition-all mb-2 ${isChecked ? 'border-lumina-gold bg-white' : 'border-zinc-200 bg-zinc-50 group-hover:border-zinc-400'
                  }`}
                  title={opt.name}
                >
                  <img src={folderPath + opt.img} alt={opt.name} />
                </div>
                { textRequired && <span className={`text-[10px] font-bold uppercase ${isChecked ? 'text-black' : 'text-zinc-400'}`}>{opt.name}</span> }
                <input type="radio" name={inpName} id={optionId} checked={isChecked} onChange={() => updateField(inpName, opt.conv)} hidden />
              </label>
            );
          }

          if (type === 'swatch') {
            return (
              <label
                key={optionId}
                htmlFor={optionId}
                title={opt.name}
                className={`w-8 h-8 rounded-full border-2 p-0.5 ${pointerClass} select-none transition-all ${isChecked ? 'border-zinc-500' : 'border-transparent hover:scale-110'
                  }`}
              >
                <img className="w-full h-full rounded-full object-cover" src={folderPath + opt.img} alt={opt.name} />
                <input type="radio" name={inpName} id={optionId} checked={isChecked} onChange={() => updateField(inpName, opt.conv)} hidden />
              </label>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}