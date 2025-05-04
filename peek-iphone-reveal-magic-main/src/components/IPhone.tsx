
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import SettingsApp from './apps/SettingsApp';
import NotesApp from './apps/NotesApp';
import AboutApp from './apps/AboutApp';
import CalendarApp from './apps/CalendarApp';
import WeatherApp from './apps/WeatherApp';
import SafariApp from './apps/SafariApp';
import PhoneApp from './apps/PhoneApp';
import { useIsMobile } from '../hooks/use-mobile';

interface IPhoneProps {
  className?: string;
  initialRotation?: { x: number; y: number };
}

const iPhone: React.FC<IPhoneProps> = ({ 
  className,
  initialRotation = { x: 10, y: 20 }
}) => {
  const [rotation, setRotation] = useState({ x: initialRotation.x, y: initialRotation.y });
  const [isLocked, setIsLocked] = useState(true);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [wallpaper, setWallpaper] = useState("https://source.unsplash.com/PO8Woh4YBD8/1080x1920");
  const [screenHeight, setScreenHeight] = useState(100); // percentage
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");
  const phoneRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const isMobile = useIsMobile();
  
  // Control Center toggles
  const [controlToggles, setControlToggles] = useState({
    airplane: false,
    wifi: true,
    bluetooth: true,
    mobileData: true,
    brightness: 75
  });
  
  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartY.current) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;
    
    // Swipe up to unlock
    if (isLocked && deltaY > 50) {
      setIsLocked(false);
      e.preventDefault();
    }
    
    // Swipe down to open control center (only when unlocked)
    if (!isLocked && !controlCenterOpen && deltaY < -50) {
      setControlCenterOpen(true);
      e.preventDefault();
    }
    
    // Swipe up to close control center
    if (controlCenterOpen && deltaY > 50) {
      setControlCenterOpen(false);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  // Handle mouse events to simulate swipe gestures on PC
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDragging.current) return;
    isDragging.current = true;
    mouseStartY.current = e.clientY;
    // Prevent page scrolling when interacting with iPhone
    document.body.style.overflow = 'hidden';
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseStartY.current || !isDragging.current) return;
    
    const mouseY = e.clientY;
    const deltaY = mouseStartY.current - mouseY;
    
    // Threshold for mouse movement to trigger actions
    if (Math.abs(deltaY) > 30) {
      // Swipe up to unlock
      if (isLocked && deltaY > 30) {
        setIsLocked(false);
        mouseStartY.current = null;
        isDragging.current = false;
      }
      
      // Swipe down to open control center (only when unlocked)
      if (!isLocked && !controlCenterOpen && deltaY < -30) {
        setControlCenterOpen(true);
        mouseStartY.current = null;
        isDragging.current = false;
      }
      
      // Swipe up to close control center
      if (controlCenterOpen && deltaY > 30) {
        setControlCenterOpen(false);
        mouseStartY.current = null;
        isDragging.current = false;
      }
    }
  };

  const handleMouseUp = () => {
    mouseStartY.current = null;
    isDragging.current = false;
    document.body.style.overflow = '';
  };

  // Open an app
  const openApp = (appName: string) => {
    setActiveApp(appName);
    setControlCenterOpen(false);
  };

  // Close the active app
  const closeApp = () => {
    setActiveApp(null);
  };
  
  // Change wallpaper
  const changeWallpaper = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
  };
  
  // Change screen height
  const handleScreenHeightChange = (newHeight: number) => {
    setScreenHeight(Math.min(Math.max(newHeight, 70), 130)); // Limit between 70% and 130%
  };
  
  // Add note
  const addNote = (note: string) => {
    if (note.trim()) {
      setNotes([...notes, note.trim()]);
      setNewNote("");
    }
  };

  // Toggle control center options
  const toggleControl = (control: keyof typeof controlToggles) => {
    if (typeof controlToggles[control] === 'boolean') {
      setControlToggles({
        ...controlToggles,
        [control]: !controlToggles[control]
      });
    }
  };

  // Handle brightness change
  const handleBrightnessChange = (value: number) => {
    setControlToggles({
      ...controlToggles,
      brightness: value
    });
  };

  // Update clock
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={cn("iphone relative", className)}
         style={{ 
           transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
           transition: "transform 0.3s ease-out"
         }}>
      {/* iPhone frame */}
      <div 
        ref={phoneRef}
        className="relative w-[250px] h-[500px] bg-black rounded-[40px] shadow-2xl overflow-hidden iphone-interactive"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* iPhone notch */}
        <div className="iphone-notch">
          {!isLocked && (
            <div className="absolute inset-x-0 top-1 text-white text-[10px] px-2 flex justify-between">
              <div>{currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              <div>📶 🔋</div>
            </div>
          )}
        </div>
        
        {/* Screen */}
        <div className="absolute inset-[3px] bg-slate-800 rounded-[36px] overflow-hidden"
             style={{height: `${screenHeight}%`}}>
          {/* Lock screen */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out z-30 ${
              isLocked ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="text-xl font-bold mb-4">iPhone 15 Pro</div>
              <div className="text-4xl font-light">
                {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div className="text-sm mt-2">{currentTime.toLocaleDateString()}</div>
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <div className="text-sm opacity-80">Swipe up to unlock</div>
                <div className="mt-2 w-10 h-1 bg-white/50 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
          
          {/* Home screen */}
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${isLocked ? 'opacity-0' : 'opacity-100'}`} 
            style={{
              backgroundImage: `url("${wallpaper}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* App grid */}
            <div className="grid grid-cols-4 gap-4 p-6 mt-12">
              {apps.map((app, index) => (
                <div 
                  key={index} 
                  className="app-icon flex flex-col items-center"
                  onClick={() => openApp(app.name)}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.icon}
                  </div>
                  <span className="text-[10px] mt-1 text-white drop-shadow-md">{app.name}</span>
                </div>
              ))}
            </div>
            
            {/* Dock */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-2xl p-2 flex gap-4">
              {dockApps.map((app, index) => (
                <div 
                  key={index}
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: app.color }}
                  onClick={() => openApp(app.name)}
                >
                  {app.icon}
                </div>
              ))}
            </div>
          </div>
          
          {/* Control Center */}
          <div 
            className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-transform duration-300 z-40 ${
              controlCenterOpen ? 'translate-y-0' : 'translate-y-[-100%]'
            }`}
          >
            <div className="p-6">
              <div className="text-white text-sm mb-4">Control Center</div>
              
              {/* Control center grid */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`bg-white/20 rounded-xl p-3 h-20 flex flex-col justify-between cursor-pointer hover:bg-white/30 ${
                    controlToggles.airplane ? 'bg-white/50' : ''
                  }`}
                  onClick={() => toggleControl('airplane')}
                >
                  <div className="text-white text-xs">Airplane Mode</div>
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${controlToggles.airplane ? 'bg-green-500' : 'bg-white/10'} flex items-center justify-center`}>✈️</div>
                  </div>
                </div>
                <div 
                  className={`bg-white/20 rounded-xl p-3 h-20 flex flex-col justify-between cursor-pointer hover:bg-white/30 ${
                    controlToggles.wifi ? 'bg-white/50' : ''
                  }`}
                  onClick={() => toggleControl('wifi')}
                >
                  <div className="text-white text-xs">Wi-Fi</div>
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${controlToggles.wifi ? 'bg-green-500' : 'bg-white/10'} flex items-center justify-center`}>📶</div>
                  </div>
                </div>
                <div 
                  className={`bg-white/20 rounded-xl p-3 h-20 flex flex-col justify-between cursor-pointer hover:bg-white/30 ${
                    controlToggles.bluetooth ? 'bg-white/50' : ''
                  }`}
                  onClick={() => toggleControl('bluetooth')}
                >
                  <div className="text-white text-xs">Bluetooth</div>
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${controlToggles.bluetooth ? 'bg-green-500' : 'bg-white/10'} flex items-center justify-center`}>📱</div>
                  </div>
                </div>
                <div 
                  className={`bg-white/20 rounded-xl p-3 h-20 flex flex-col justify-between cursor-pointer hover:bg-white/30 ${
                    controlToggles.mobileData ? 'bg-white/50' : ''
                  }`}
                  onClick={() => toggleControl('mobileData')}
                >
                  <div className="text-white text-xs">Mobile Data</div>
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${controlToggles.mobileData ? 'bg-green-500' : 'bg-white/10'} flex items-center justify-center`}>📡</div>
                  </div>
                </div>
              </div>
              
              {/* Brightness slider */}
              <div className="mt-4 bg-white/20 rounded-xl p-3">
                <div className="text-white text-xs mb-2">Brightness</div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={controlToggles.brightness}
                  onChange={(e) => handleBrightnessChange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <div className="text-sm text-white/70">Swipe up to close</div>
              </div>
            </div>
          </div>
          
          {/* Apps */}
          {activeApp && (
            <div className={`absolute inset-0 bg-white z-50 app-screen transition-all duration-300 ${
              activeApp ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'
            }`}>
              <div className="p-4 h-full overflow-auto">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">{activeApp}</div>
                  <button 
                    onClick={closeApp}
                    className="text-sm px-3 py-1 bg-gray-200 rounded-full"
                  >
                    Close
                  </button>
                </div>
                
                {/* Settings App */}
                {activeApp === "Settings" && (
                  <SettingsApp 
                    openApp={openApp} 
                    screenHeight={screenHeight} 
                    onScreenHeightChange={handleScreenHeightChange}
                    currentWallpaper={wallpaper}
                    onWallpaperChange={changeWallpaper}
                  />
                )}
                
                {/* Notes App */}
                {activeApp === "Notes" && (
                  <NotesApp 
                    notes={notes} 
                    newNote={newNote} 
                    setNewNote={setNewNote} 
                    addNote={addNote} 
                  />
                )}
                
                {/* About App */}
                {activeApp === "About" && <AboutApp />}
                
                {/* Calendar App */}
                {activeApp === "Calendar" && <CalendarApp />}
                
                {/* Weather App */}
                {activeApp === "Weather" && <WeatherApp />}
                
                {/* Safari App */}
                {activeApp === "Safari" && <SafariApp />}
                
                {/* Phone App */}
                {activeApp === "Phone" && <PhoneApp />}
                
                {/* Generic app content for other apps */}
                {!["Settings", "Notes", "About", "Calendar", "Weather", "Safari", "Phone"].includes(activeApp) && (
                  <div className="text-center mt-20">
                    <div className="text-xl">App Content</div>
                    <p className="text-gray-600 mt-4">This is a demo of the {activeApp} app.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Side buttons */}
        <div className="iphone-button volume-up"></div>
        <div className="iphone-button volume-down"></div>
        <div className="iphone-button power-button"></div>
      </div>
      
      {/* Reflection/shadow beneath */}
      <div 
        className="absolute bottom-[-20px] left-[10%] w-[80%] h-[15px] bg-black/20 rounded-full blur-md"
        style={{
          transform: "rotateX(60deg)",
        }}
      ></div>
    </div>
  );
};

// Dummy app data
const apps = [
  { name: "Messages", color: "#34C759", icon: <span>💬</span> },
  { name: "Calendar", color: "#FF9500", icon: <span>📅</span> },
  { name: "Photos", color: "#FF2D55", icon: <span>🖼️</span> },
  { name: "Camera", color: "#5856D6", icon: <span>📷</span> },
  { name: "Settings", color: "#8E8E93", icon: <span>⚙️</span> },
  { name: "About", color: "#007AFF", icon: <span>ℹ️</span> },
  { name: "Notes", color: "#FFCC00", icon: <span>📝</span> },
  { name: "Weather", color: "#34AADC", icon: <span>🌤️</span> },
];

const dockApps = [
  { name: "Phone", color: "#34C759", icon: <span>📱</span> },
  { name: "Safari", color: "#007AFF", icon: <span>🌐</span> },
  { name: "Mail", color: "#5856D6", icon: <span>✉️</span> },
  { name: "Music", color: "#FF2D55", icon: <span>🎵</span> },
];

export default iPhone;
