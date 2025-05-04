
import { useRef, useEffect, useState } from 'react';
import IPhone from '@/components/IPhone';
import ScrollToReveal from '@/components/ScrollToReveal';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const isMobile = useIsMobile();

  const handleScroll = () => {
    if (!mainRef.current || isInteracting) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percentage = (scrollTop / maxScroll) * 100;
    
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInteracting]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTryNow = () => {
    const tryNowSection = document.getElementById('try-now');
    if (tryNowSection) {
      tryNowSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle iPhone interaction state
  const handleIPhoneInteraction = (interacting: boolean) => {
    setIsInteracting(interacting);
    
    // Prevent page scrolling when interacting with iPhone
    if (interacting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <div ref={mainRef} className="min-h-[300vh] relative">
      {/* Hero Section with gradient background */}
      <section className="min-h-screen w-full gradient-bg flex items-center justify-center relative py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white space-y-6 order-2 md:order-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Experience the</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
                  iPhone Peek Effect
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80">
                A stunning 3D reveal animation that brings your content to life. Scroll to see the magic happen.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={scrollToNext} 
                  className="bg-white text-purple-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-opacity-90 transition"
                >
                  See Features
                  <ArrowDown size={18} />
                </button>
                <button 
                  onClick={scrollToTryNow} 
                  className="bg-transparent border border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition"
                >
                  Try It Now
                </button>
              </div>
            </div>
            
            <div className="peek-container relative flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
              {/* The iPhone component */}
              <IPhone className={`
                transform-gpu animate-float
                ${scrollPercentage > 5 ? 'translate-y-[-30px]' : ''}
                ${isMobile ? 'scale-75' : ''}
              `} />
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block">
            <div className="flex flex-col items-center text-white/70">
              <p className="mb-2 text-sm">Scroll to explore</p>
              <ArrowDown className="animate-bounce" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollToReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-20">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Amazing Features
              </span>
            </h2>
          </ScrollToReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {features.map((feature, index) => (
              <ScrollToReveal 
                key={index} 
                delay={index * 200} 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 sm:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </ScrollToReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Try Now Section */}
      <section id="try-now" className="py-12 sm:py-20 bg-indigo-50">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollToReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Try It Now
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-center text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Experience the interactive iPhone model. Swipe up to unlock, tap on apps, and more!
            </p>
          </ScrollToReveal>
          
          <div className="flex justify-center items-center">
            <div 
              className="sticky top-1/4" 
              onMouseDown={() => handleIPhoneInteraction(true)} 
              onMouseUp={() => handleIPhoneInteraction(false)}
              onTouchStart={() => handleIPhoneInteraction(true)}
              onTouchEnd={() => handleIPhoneInteraction(false)}
            >
              {/* Interactive iPhone with fixed initial rotation */}
              <IPhone initialRotation={{ x: 0, y: 0 }} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 sm:py-20 gradient-bg text-white">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollToReveal threshold={0.1}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">Ready to Create Your Own?</h2>
            <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Implement this beautiful effect in your next project and amaze your users with interactive 3D animations.
            </p>
            <button className="bg-white text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-opacity-90 transition">
              Get Started Now
            </button>
          </ScrollToReveal>
        </div>
      </section>
    </div>
  );
};

// Feature data
const features = [
  {
    title: "Interactive Animation",
    description: "The iPhone model responds to your scrolling with smooth, realistic 3D rotations.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  {
    title: "Gorgeous Design",
    description: "Beautiful gradients and smooth animations create a premium visual experience.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
  },
  {
    title: "Fully Responsive",
    description: "Works perfectly on all devices, from mobile phones to large desktop screens.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
  }
];

export default Index;
