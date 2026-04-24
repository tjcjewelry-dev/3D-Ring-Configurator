import { MessageSquare, Bookmark } from 'lucide-react';

export default function ActionBar({ activeTab, setActiveTab }) {
  const getButtonText = () => {
    if (activeTab === 'Diamond') return 'Next: Choose Band';
    if (activeTab === 'Band') return 'Next: Choose Setting';
    if (activeTab === 'Setting') return 'View Summary';
    return 'Add to Cart';
  };

  const handleNext = () => {
    if (activeTab === 'Diamond') setActiveTab('Band');
    else if (activeTab === 'Band') setActiveTab('Setting');
    else if (activeTab === 'Setting') setActiveTab('Summary');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:sticky lg:bottom-0 bg-white border-t p-4 lg:px-12 flex items-center justify-between z-40 lg:shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <div className="hidden lg:flex items-center text-xs font-bold text-zinc-500 hover:text-black cursor-pointer uppercase tracking-tighter">
        <MessageSquare size={18} className="mr-2" /> Need Help? Chat with us
      </div>

      <div className="flex w-full lg:w-auto items-center space-x-3">
        <button className="p-3 border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50">
          <Bookmark size={20} />
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 lg:min-w-[200px] bg-[#2A2A2A] text-white py-4 rounded-md text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}