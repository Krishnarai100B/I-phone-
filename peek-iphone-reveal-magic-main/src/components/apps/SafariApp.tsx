
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SafariApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [webpageContent, setWebpageContent] = useState<React.ReactNode | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Format the query for a Google search
    const query = searchQuery.trim();
    let searchUrl = '';
    
    if (query.startsWith('http://') || query.startsWith('https://')) {
      searchUrl = query;
    } else if (query.includes('.') && !query.includes(' ')) {
      searchUrl = `https://${query}`;
    } else {
      searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    setCurrentUrl(searchUrl);
    
    // Simulate webpage loading
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate a mock webpage based on the search
      setWebpageContent(
        <div className="webpage-mockup">
          <div className="p-2 bg-gray-100 mb-2 text-xs">
            {searchUrl}
          </div>
          
          {query.toLowerCase().includes('weather') && (
            <div className="p-3 bg-blue-50 rounded mb-3">
              <div className="font-bold">Weather</div>
              <div className="flex justify-between items-center">
                <span>Partly Cloudy</span>
                <span className="text-2xl">☁️ 18°C</span>
              </div>
            </div>
          )}
          
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-3 border-b pb-3">
              <div className="font-bold text-blue-600">
                {i === 1 ? `Results for: ${query}` : `Related result ${i}`}
              </div>
              <div className="text-xs text-green-700">www.example.com/result-{i}</div>
              <p className="text-sm mt-1">
                This is a simulated search result for "{query}". In a real browser, 
                you would see actual web content here from the internet.
              </p>
            </div>
          ))}
        </div>
      );
    }, 1000);
  };
  
  return (
    <div className="safari-app mt-6">
      <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full p-1 mb-4">
        <div className="px-2">
          <Search size={16} className="text-gray-500" />
        </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search or enter website name"
          className="flex-1 bg-transparent border-none outline-none p-1 text-sm"
        />
        <button 
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs"
        >
          Go
        </button>
      </form>
      
      <div className="browser-content bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="mt-2 text-sm text-gray-500">Loading...</div>
          </div>
        ) : webpageContent ? (
          <div className="p-3 h-64 overflow-auto">
            {webpageContent}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-4">
            <div className="text-5xl mb-3">🌐</div>
            <div className="text-center text-gray-500">
              <p className="mb-1">Welcome to Safari</p>
              <p className="text-sm">Search or enter a website above</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;
