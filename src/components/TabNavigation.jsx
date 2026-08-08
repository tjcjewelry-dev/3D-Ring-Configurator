import { options } from "../data/options";

export default function TabNavigation({ activeTab, setActiveTab }) {  
  const tabs = [
    { id: 'Diamond', label: 'Diamond', icon: '💎' },
    { id: 'Band', label: 'Band', icon: '💍' },
    { id: 'Head', label: 'Head', icon: '⚒️' },
    // { id: 'Summary', label: 'Summary', icon: '📋' }
  ];

  if(options.hasQuilt) {
    tabs.push({ id: 'Quilt', label: 'Quilt', icon: '📋' });
  }

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 flex flex-col items-center py-4 cursor-pointer relative transition-all ${
            activeTab === tab.id ? 'text-black' : 'text-zinc-400'
          }`}
        >
          <span className="text-lg mb-1">{tab.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-yellow-600" />
          )}
        </button>
      ))}
    </div>
  );
}