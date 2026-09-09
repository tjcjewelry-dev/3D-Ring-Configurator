import { useSelections } from "../store/useSelections";

export function Engraving({ label, engravingFonts }) {
  const engravingText = useSelections(state => state.engravingText);
  const engravingFont = useSelections(state => state.engravingFont);
  const updateField = useSelections((state) => state.updateField);

  function updateEngravingText(e) {
    const inpText = e.target.value?.slice(0, 25);
    updateField("engravingText", inpText)
  }

  const engravingClass = engravingFonts?.find(font => font.conv == engravingFont).class || engravingFont[0].class;

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter mb-3">{label}</p>
      <div style={{ width: "min(392px, 100%)" }}>
        <div className="relative w-full">
          <img src="/engraving.jpg" className={`rounded-md border transition-all ${engravingText?.length > 0 ? 'border-zinc-400' : 'border-zinc-200'} bg-zinc-50 object-cover w-full`} alt="engraving img" />
          <p className={`absolute text-center select-none ${engravingClass}`}  style={{ top: "50%", transform: "translateY(-50%)", width: "min(392px, 100%)" }}>{engravingText}</p>
        </div>
        <div className="w-full flex flex-col flex-wrap gap-1 mt-[4px]">
          <div className="w-full overflow-x-hidden">
            <input className={`rounded-md w-full px-3 py-2.5 text-sm border transition-all bg-zinc-50 ${engravingText?.length > 0 ? 'border-zinc-400' : 'border-zinc-200'} outline-hidden focus:outline-hidden`} type="text" value={engravingText} name="engravingText" maxLength={25} onChange={updateEngravingText} placeholder="..." />
            <p className="text-xs mt-[2px]">{engravingText?.length || 0} of 25</p>
          </div>
          <select name="engraving-font" className={`px-3 w-full py-2.5 rounded-md text-sm border transition-all bg-zinc-50 text-zinc-500 ${engravingText?.length > 0 ? 'border-zinc-400 font-bold text-black' : 'border-zinc-200'} cursor-pointer`} title="engraving-font" value={engravingFont} onChange={(e) => updateField("engravingFont", e.target.value)}>
            {engravingFonts.map((font, ind) => {
              const optionId = `eng-font-${ind + 1}`;
              return <option className="text-zinc-500" key={optionId} value={font.conv}>{font.name}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}

export default function OptionSelector({ label, options, type, inpName, textRequired = true, folderPath = null }) {
  const currentSelection = useSelections((state) => state[inpName]);
  const updateField = useSelections((state) => state.updateField);
  const modelActive = true;

  const pointerClass = !modelActive
    ? "cursor-not-allowed pointer-events-none opacity-50"
    : "cursor-pointer pointer-events-auto opacity-100";

  if (type === "select") {
    return (
      <div className="mb-6">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter mb-3">{label}</p>
        <select className="px-3 py-2.5 rounded-md text-sm border transition-all bg-zinc-50 text-zinc-500 border-zinc-400 cursor-pointer font-bold text-black" value={currentSelection ?? ''} onChange={(e) => updateField(inpName, e.target.value)}>
          {options.map((opt, ind) => {
            const optionId = `${inpName}-${ind + 1}-${opt.conv || opt}`;
            return <option className="text-zinc-500" key={optionId} title={opt.name} value={opt.conv}>
              {opt.name}
            </option>
          })}
        </select>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter mb-3">{label}</p>

      <div className={`flex flex-wrap gap-3`}>

        {options.map((opt, ind) => {
          const optionId = `${inpName}-${ind + 1}-${opt.conv || opt}`;
          const isChecked = (opt.conv || opt) == currentSelection;

          if (type === 'pill') {
            return (
              <label
                key={optionId}
                htmlFor={optionId}
                className={`px-6 py-2.5 rounded-md text-sm border transition-all ${pointerClass} select-none ${isChecked ? 'border-lumina-gold bg-white shadow-sm font-bold' : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-400'
                  }`}
                title={opt.name || opt}
              >
                <span>{opt.name || opt}</span>
                <input type="radio" name={inpName} id={optionId} checked={isChecked} onChange={() => updateField(inpName, opt.conv || opt)} hidden />
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
                {textRequired && <span className={`text-[10px] font-bold uppercase ${isChecked ? 'text-black' : 'text-zinc-400'}`}>{opt.name}</span>}
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