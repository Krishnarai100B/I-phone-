
import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const PhoneApp: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<null | 'calling' | 'ended'>(null);
  
  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(prev => prev + num);
    }
  };
  
  const handleDeleteClick = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };
  
  const handleCallClick = () => {
    if (phoneNumber.length > 0) {
      setCallStatus('calling');
      
      // End the call after 3 seconds
      setTimeout(() => {
        setCallStatus('ended');
        
        // Reset after another 2 seconds
        setTimeout(() => {
          setCallStatus(null);
        }, 2000);
      }, 3000);
    }
  };
  
  const formatPhoneNumber = (number: string) => {
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)}-${number.slice(3)}`;
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
  };
  
  const dialerButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '*', '0', '#'
  ];
  
  return (
    <div className="phone-app mt-6">
      {callStatus ? (
        <div className="call-screen text-center p-4">
          <div className="text-xl font-bold mb-2">{formatPhoneNumber(phoneNumber)}</div>
          <div className="text-gray-500 mb-8">
            {callStatus === 'calling' ? 'Calling...' : 'Call ended'}
          </div>
          
          {callStatus === 'calling' && (
            <div className="animate-pulse flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Phone size={36} className="text-green-600" />
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setCallStatus(null)}
            className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto"
          >
            <Phone size={24} className="text-white transform rotate-135" />
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-gray-100 p-3 rounded-lg">
            <div className="text-2xl text-center font-light">
              {phoneNumber ? formatPhoneNumber(phoneNumber) : 'Enter a number'}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {dialerButtons.map((num) => (
              <button 
                key={num}
                onClick={() => handleNumberClick(num)}
                className="aspect-square rounded-full bg-gray-200 flex items-center justify-center text-xl hover:bg-gray-300"
              >
                {num}
              </button>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center gap-4">
            <button 
              onClick={handleCallClick}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center"
              disabled={phoneNumber.length === 0}
            >
              <Phone size={24} className="text-white" />
            </button>
            
            {phoneNumber.length > 0 && (
              <button 
                onClick={handleDeleteClick}
                className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center"
              >
                ←
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneApp;
