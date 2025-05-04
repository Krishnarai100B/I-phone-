
import React from 'react';

interface SettingsAppProps {
  openApp: (appName: string) => void;
  screenHeight: number;
  onScreenHeightChange: (height: number) => void;
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({
  openApp,
  screenHeight,
  onScreenHeightChange,
  currentWallpaper,
  onWallpaperChange
}) => {
  const wallpapers = [
    "https://source.unsplash.com/PO8Woh4YBD8/1080x1920", // Blue starry night
    "https://source.unsplash.com/HUiSySuofY0/1080x1920", // Colorful abstract
    "https://source.unsplash.com/cFplR9ZGnAk/1080x1920", // Mountain landscape
    "https://source.unsplash.com/U-Kty6HxcQc/1080x1920", // Dark pattern
    "https://source.unsplash.com/photo-1500673922987-e212871fec22/1080x1920", // Yellow lights
    "https://source.unsplash.com/photo-1506744038136-46273834b3fb/1080x1920", // Lake and trees
    "https://source.unsplash.com/photo-1469474968028-56623f02e42e/1080x1920", // Mountain with sunrays
    "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb/1080x1920"  // River between mountains
  ];

  return (
    <div className="mt-6">
      <div className="space-y-4">
        <div 
          className="p-3 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-200"
          onClick={() => openApp("About")}
        >
          <span>About</span>
          <span>〉</span>
        </div>
        
        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Display</h3>
          <div>
            <label className="text-sm text-gray-600">Screen Height: {screenHeight}%</label>
            <input
              type="range"
              min="70"
              max="130"
              value={screenHeight}
              onChange={(e) => onScreenHeightChange(parseInt(e.target.value))}
              className="w-full mt-2"
            />
            <p className="text-xs text-gray-500 mt-1">Adjust the height of the phone screen</p>
          </div>
        </div>
        
        <div className="p-3 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Wallpaper</h3>
          <p className="text-xs text-gray-500 mb-3">Tap on a wallpaper to apply it</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {wallpapers.map((wallpaper, index) => (
              <div 
                key={index}
                className={`h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${currentWallpaper === wallpaper ? 'border-blue-500 scale-95' : 'border-transparent hover:scale-95'}`}
                onClick={() => onWallpaperChange(wallpaper)}
              >
                <img 
                  src={wallpaper} 
                  alt={`Wallpaper ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
