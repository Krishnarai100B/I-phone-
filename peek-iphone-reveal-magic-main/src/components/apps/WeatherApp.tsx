
import React, { useState, useEffect } from 'react';

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<string>("New York");
  const [currentWeather, setCurrentWeather] = useState({
    temperature: "24°",
    condition: "Partly Cloudy",
    icon: "🌤️",
    high: "27°",
    low: "18°",
    humidity: "45%",
    wind: "10 km/h"
  });
  
  const [forecast, setForecast] = useState([
    { day: "Mon", icon: "☀️", high: "27°", low: "18°" },
    { day: "Tue", icon: "🌤️", high: "25°", low: "17°" },
    { day: "Wed", icon: "🌧️", high: "22°", low: "16°" },
    { day: "Thu", icon: "🌧️", high: "21°", low: "15°" },
    { day: "Fri", icon: "⛅", high: "23°", low: "16°" }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const cities = ["New York", "London", "Tokyo", "Sydney", "Paris"];
  
  const changeCity = (city: string) => {
    setIsLoading(true);
    setLocation(city);
    
    // Simulate API call
    setTimeout(() => {
      // Generate random weather data
      const temperature = Math.floor(Math.random() * 25) + 10;
      const conditions = ["Sunny", "Cloudy", "Rainy", "Partly Cloudy", "Clear"];
      const icons = ["☀️", "☁️", "🌧️", "🌤️", "🌈"];
      
      const randomCondition = Math.floor(Math.random() * conditions.length);
      
      setCurrentWeather({
        temperature: `${temperature}°`,
        condition: conditions[randomCondition],
        icon: icons[randomCondition],
        high: `${temperature + 3}°`,
        low: `${temperature - 4}°`,
        humidity: `${Math.floor(Math.random() * 60) + 20}%`,
        wind: `${Math.floor(Math.random() * 20) + 5} km/h`
      });
      
      // Update forecast
      const newForecast = forecast.map(day => ({
        ...day,
        high: `${Math.floor(Math.random() * 10) + temperature}°`,
        low: `${Math.floor(Math.random() * 10) + temperature - 10}°`,
        icon: icons[Math.floor(Math.random() * icons.length)]
      }));
      
      setForecast(newForecast);
      setIsLoading(false);
    }, 800);
  };
  
  // Initialize with a random city on first load
  useEffect(() => {
    changeCity(cities[Math.floor(Math.random() * cities.length)]);
  }, []);
  
  return (
    <div className="weather-app mt-6">
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading weather data...</p>
        </div>
      ) : (
        <>
          {/* City selection */}
          <div className="overflow-x-auto mb-4">
            <div className="flex space-x-2">
              {cities.map(city => (
                <button
                  key={city}
                  className={`px-3 py-1 rounded-full whitespace-nowrap ${
                    location === city ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => changeCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
          
          {/* Current weather */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{location}</h2>
                <p className="text-lg opacity-90">{currentWeather.condition}</p>
                <p className="text-sm opacity-80">H: {currentWeather.high} L: {currentWeather.low}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">{currentWeather.icon}</div>
                <div className="text-4xl font-light">{currentWeather.temperature}</div>
              </div>
            </div>
          </div>
          
          {/* Weather details */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold">{currentWeather.humidity}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Wind</p>
              <p className="font-semibold">{currentWeather.wind}</p>
            </div>
          </div>
          
          {/* Forecast */}
          <h3 className="font-medium mb-2">5-Day Forecast</h3>
          <div className="bg-blue-50 rounded-lg overflow-hidden">
            {forecast.map((day, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-3 ${
                  index < forecast.length - 1 ? 'border-b border-blue-100' : ''
                }`}
              >
                <span className="font-medium">{day.day}</span>
                <span className="text-xl">{day.icon}</span>
                <span className="text-gray-800">{day.high} / {day.low}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
