import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#4CD6B4]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#4CD6B4]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex flex-col items-center gap-4 mb-6 mt-8">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 553.61 200"
              className="w-64"
            >
              <path className="fill-white" d="M371.99,106.73c2.26-.12,4.4-.04,6.54.77.4.15.78.32,1.16.52.38.19.74.4,1.1.63s.7.48,1.03.74c.33.27.64.55.94.85.3.3.58.61.85.94.27.33.52.67.75,1.03.23.36.44.72.64,1.1.19.38.36.76.52,1.16.15.39.28.79.39,1.2.11.4.2.81.27,1.23.07.41.12.83.15,1.25.03.42.03.84.02,1.26-.01.42-.05.84-.11,1.25-.06.42-.14.83-.23,1.24-.1.41-.22.81-.36,1.21-.14.4-.3.78-.48,1.16-1.78,3.81-4.86,5.75-8.68,7.12-2.57.07-5.08.05-7.47-1.04-.36-.17-.71-.35-1.05-.55-.34-.2-.67-.41-.99-.65-.32-.23-.63-.48-.92-.74-.3-.26-.58-.54-.85-.83-.27-.29-.52-.59-.76-.91-.24-.31-.46-.64-.67-.98-.21-.34-.4-.68-.57-1.04-.17-.35-.33-.72-.47-1.09-.15-.39-.28-.79-.38-1.2-.11-.41-.19-.82-.26-1.23-.07-.42-.11-.83-.14-1.25-.02-.42-.03-.84,0-1.26.02-.42.06-.84.12-1.26.06-.42.14-.83.24-1.24.1-.41.22-.81.36-1.21s.3-.78.48-1.16c1.85-3.81,4.98-5.68,8.84-7.04Z"/>
              <path className="fill-[#3AC6A2]" d="M227.69,29.22h31.12c-4.18,13.82-9.18,27.52-13.95,41.16l-1.65,4.39-24.2-.12c2.02-15.18,6.22-30.26,8.68-45.43Z"/>
              <path className="fill-[#3AC6A2]" d="M94.43,29.11c10.46-.12,20.93-.11,31.39.03,2.13,15.24,6.74,30.07,8.56,45.34l-24.59.12c-4.76-15.27-10.12-30.38-15.36-45.49Z"/>
              <path className="fill-[#3AC6A2]" d="M176.46,111.5c5.29,7.22,8.66,17.46,12.41,25.64,5.79,12.52,11.69,24.99,17.7,37.41-9.97.28-20,.06-29.98.07l-30.7.03c10.63-20.77,20.28-42.2,30.56-63.16Z"/>
              <path className="fill-white" d="M365.64,148.61l17.66-.07c.1,30.01.04,60.02-.16,90.03l-17.43.14c-.67-11.45-.29-23.05-.25-34.51l.18-55.59Z"/>
              <path className="fill-[#3AC6A2]" d="M176.62,0c5.25,2.66,16.01,13.58,20.73,17.81-3.28,9.9-5.92,19.92-8.34,30.06,7.57-6.85,15.76-12.95,24.14-18.76-2.33,15.21-5.66,30.27-8.18,45.46l-30.4.02h-26.12c-3.12-15.33-5.63-30.81-8.55-46.19,9.05,6.38,17.05,13.36,25.23,20.75-3.05-10.41-5.67-20.96-8.74-31.38,6.37-6.27,13.43-11.95,20.21-17.77Z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-relaxed mb-6 animate-fade-in text-white drop-shadow-lg">
            نظام متكامل
            <span className="block mt-2 bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent drop-shadow-lg leading-relaxed">
              لإدارة القضايا القانونية
            </span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto animate-fade-in drop-shadow leading-relaxed mb-8">
            منصة احترافية تساعد المحامين على إدارة القضايا وتنظيم الملفات ومتابعة المواعيد مع توفير بوابة آمنة للعملاء
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 min-w-[200px]"
            >
              ابدأ الآن مجاناً
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
