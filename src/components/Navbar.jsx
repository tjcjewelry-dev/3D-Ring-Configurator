import { ShoppingBag, Heart, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 border-b px-4 lg:px-12 flex items-center justify-between sticky top-0 bg-white z-50">
      <div className="text-2xl font-serif tracking-[0.3em] uppercase">AJAFFE</div>
      
      {/* <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-zinc-600">
        <a href="#" className="hover:text-black">Design</a>
        <a href="#" className="hover:text-black">Collections</a>
        <a href="#" className="hover:text-black">About Us</a>
      </div>

      <div className="flex items-center space-x-5 text-zinc-700">
        <button className="hover:text-black hidden sm:block"><Search size={20} /></button>
        <button className="hover:text-black"><Heart size={20} /></button>
        <button className="hover:text-black relative">
          <ShoppingBag size={20} />
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </button>
      </div> */}
    </nav>
  );
}