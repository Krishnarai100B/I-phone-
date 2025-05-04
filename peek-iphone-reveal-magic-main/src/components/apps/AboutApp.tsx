
import React from 'react';

const AboutApp: React.FC = () => {
  const specifications = [
    { name: "Model", value: "iPhone 15 Pro" },
    { name: "Display", value: "6.1-inch Super Retina XDR" },
    { name: "Chip", value: "A17 Pro chip" },
    { name: "Camera", value: "Pro camera system (48MP, 12MP, 12MP)" },
    { name: "Video", value: "4K video recording at 24/30/60 fps" },
    { name: "Face ID", value: "Enabled" },
    { name: "Battery", value: "Up to 23 hours video playback" },
    { name: "Storage", value: "256GB" },
    { name: "OS", value: "iOS 17" },
    { name: "Color", value: "Titanium Blue" }
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center">
          <span className="text-3xl">📱</span>
        </div>
      </div>
      
      <h2 className="text-center text-xl font-semibold mb-2">iPhone 15 Pro</h2>
      <p className="text-center text-gray-500 mb-6">Model A2650</p>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-3">Specifications</h3>
        
        <div className="space-y-2">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-gray-600">{spec.name}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center text-sm">
        <p>© 2025 Apple Inc. All rights reserved.</p>
        <p className="mt-1 text-xs text-gray-500">Demo for educational purposes only</p>
      </div>
    </div>
  );
};

export default AboutApp;
