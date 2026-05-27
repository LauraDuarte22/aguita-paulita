// src/App.jsx

import { useState } from 'react';

import FloatingFeedback from './components/FloatingFeedback';
import BottomNav from './components/BottomNav';

import HomeLayout from './layouts/HomeLayout';
import StatsLayout from './layouts/StatsLayout';
import SettingsLayout from './layouts/SettingsLayout';

import { useWaterTracker } from './hooks/useWaterTracker';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  // Global water state
  const water = useWaterTracker();

  return (
    <div
      className="
        min-h-screen

        bg-gradient-to-b
        from-sky-50
        via-blue-50
        to-cyan-50

        relative

        overflow-x-hidden
      "
    >
      {/* Floating feedback */}
      <FloatingFeedback value={water.floatingValue} />

      {/* Current screen */}
      {currentTab === 'home' && <HomeLayout water={water} />}

      {currentTab === 'stats' && <StatsLayout water={water} />}

      {currentTab === 'settings' && <SettingsLayout water={water} />}

      {/* Bottom navigation */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}
