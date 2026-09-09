import { useSelections } from "../store/useSelections";

function MatchingBandViewer() {
    const viewMatchingBand = useSelections(state => state.viewMatchingBand);
    const toggleMatchingBandView = useSelections(state => state.toggleMatchingBandView);

    return (
        <div className="absolute" style={{ right: 0, bottom: 0, padding: '30px' }}>
            <button
                type="button"
                className={`px-6 py-2.5 rounded-md text-sm border transition-all cursor-pointer pointer-events-auto opacity-100 font-bold select-none ${viewMatchingBand ? "border-lumina-gold bg-white shadow-sm" : "border-zinc-400 bg-zinc-50 text-zinc-500 hover:border-lumina-gold hover:bg-white hover:shadow-sm"}`}
                onClick={toggleMatchingBandView}
            >
                {viewMatchingBand ? `Remove Matching Band` : `View Matching Band`}
            </button>
        </div>
    );
}

export default MatchingBandViewer;