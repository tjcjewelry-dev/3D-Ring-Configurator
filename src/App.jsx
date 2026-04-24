import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductViewer from './components/ProductViewer';
import CustomizerPanel from './components/CustomizerPanel';
import TabNavigation from './components/TabNavigation';
import ActionBar from './components/ActionBar';
import LoadingGate from './components/LoadingGate';

export default function App() {
  const [activeTab, setActiveTab] = useState('Diamond');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* <Navbar /> */}

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