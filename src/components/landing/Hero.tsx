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
              viewBox="0 0 553.61 286.91"
              className="w-64 h-64"
            >
              <path className="fill-white" d="M371.99,106.73c2.26-.12,4.4-.04,6.54.77.4.15.78.32,1.16.52.38.19.74.4,1.1.63s.7.48,1.03.74c.33.27.64.55.94.85.3.3.58.61.85.94.27.33.52.67.75,1.03.23.36.44.72.64,1.1.19.38.36.76.52,1.16.15.39.28.79.39,1.2.11.4.2.81.27,1.23.07.41.12.83.15,1.25.03.42.03.84.02,1.26-.01.42-.05.84-.11,1.25-.06.42-.14.83-.23,1.24-.1.41-.22.81-.36,1.21-.14.4-.3.78-.48,1.16-1.78,3.81-4.86,5.75-8.68,7.12-2.57.07-5.08.05-7.47-1.04-.36-.17-.71-.35-1.05-.55-.34-.2-.67-.41-.99-.65-.32-.23-.63-.48-.92-.74-.3-.26-.58-.54-.85-.83-.27-.29-.52-.59-.76-.91-.24-.31-.46-.64-.67-.98-.21-.34-.4-.68-.57-1.04-.17-.35-.33-.72-.47-1.09-.15-.39-.28-.79-.38-1.2-.11-.41-.19-.82-.26-1.23-.07-.42-.11-.83-.14-1.25-.02-.42-.03-.84,0-1.26.02-.42.06-.84.12-1.26.06-.42.14-.83.24-1.24.1-.41.22-.81.36-1.21s.3-.78.48-1.16c1.85-3.81,4.98-5.68,8.84-7.04Z"/>
              <path className="fill-[#3AC6A2]" d="M227.69,29.22h31.12c-4.18,13.82-9.18,27.52-13.95,41.16l-1.65,4.39-24.2-.12c2.02-15.18,6.22-30.26,8.68-45.43Z"/>
              <path className="fill-[#3AC6A2]" d="M94.43,29.11c10.46-.12,20.93-.11,31.39.03,2.13,15.24,6.74,30.07,8.56,45.34l-24.59.12c-4.76-15.27-10.12-30.38-15.36-45.49Z"/>
              <path className="fill-[#3AC6A2]" d="M138.96,189.16h75.2c-6.22,5.44-12.32,11.04-18.47,16.56-6.4,5.93-12.86,11.79-19.37,17.59-13.16-10.47-25.29-22.46-37.36-34.15Z"/>
              <path className="fill-[#3AC6A2]" d="M110.53,183.92c7.24,4.96,13.78,12.47,20.21,18.51,12.83,12.05,25.74,24.12,39.07,35.62l-32.52.08c-6.32.04-13.09.55-19.36-.19-2.02-.24-3.6-.63-5.37-1.62-3.96-4.95-2.21-43.9-2.02-52.39Z"/>
              <path className="fill-white" d="M365.64,148.61l17.66-.07c.1,30.01.04,60.02-.16,90.03l-17.43.14c-.67-11.45-.29-23.05-.25-34.51l.18-55.59Z"/>
              <path className="fill-[#3AC6A2]" d="M242.1,185c.6.56.62.71.75,1.5,1.06,6.45-.14,13.91-.14,20.46,0,7.63.74,15.46.3,23.06-.08,1.47-.17,4.47-1.22,5.54-1.73,1.77-5.63,2.09-8.03,2.36-5.73.65-11.88.18-17.66.18h-32.6s-.39-.55-.39-.55c1.91-3.3,10.29-9.73,13.48-12.58,15.03-13.48,30.2-26.8,45.51-39.97Z"/>
              <path className="fill-[#3AC6A2]" d="M176.46,111.5c5.29,7.22,8.66,17.46,12.41,25.64,5.79,12.52,11.69,24.99,17.7,37.41-9.97.28-20,.06-29.98.07l-30.7.03c10.63-20.77,20.28-42.2,30.56-63.16Z"/>
              <path className="fill-[#3AC6A2]" d="M110.53,89.68c19.66-.1,39.32-.07,58.98.06l-27.23,57.63c-3.41,7.61-6.49,16.61-11.12,23.49-1.22,1.81-3.01,3.74-5.33,3.93-2.42.2-4.47-1.43-6.07-3.05-.49-.49-.96-.99-1.41-1.51-.45-.52-.89-1.05-1.31-1.6-.42-.55-.82-1.11-1.2-1.68-.38-.57-.74-1.16-1.08-1.76-.34-.6-.66-1.21-.96-1.83-.3-.62-.58-1.25-.84-1.89-.26-.64-.5-1.28-.72-1.94-.22-.65-.41-1.31-.59-1.98-2.41-9.38-1.31-20.37-1.26-30.02.12-12.62.16-25.24.13-37.85Z"/>
              <path className="fill-[#3AC6A2]" d="M183.11,89.72c19.67-.47,39.54-.49,59.21-.02-.05,12.93-.04,25.86.05,38.79.05,8.94,1.25,20.23-.75,28.78-1,4.27-3.31,7.7-5.8,11.2-2.75,2.86-6.44,6.3-10.53,6.73-1.49-.55-1.56-.79-2.42-2.14-5.1-7.95-8.77-17.67-12.86-26.26l-26.9-57.1Z"/>
              <path className="fill-[#3AC6A2]" d="M176.62,0c5.25,2.66,16.01,13.58,20.73,17.81-3.28,9.9-5.92,19.92-8.34,30.06,7.57-6.85,15.76-12.95,24.14-18.76-2.33,15.21-5.66,30.27-8.18,45.46l-30.4.02h-26.12c-3.12-15.33-5.63-30.81-8.55-46.19,9.05,6.38,17.05,13.36,25.23,20.75-3.05-10.41-5.67-20.96-8.74-31.38,6.37-6.27,13.43-11.95,20.21-17.77Z"/>
              <path className="fill-white" d="M462.29,148.53c6.51-.1,13.02-.12,19.53-.06-3.23,8.49-7.18,16.87-10.88,25.18l-22.23,48.84c-4.84,11.29-10.23,22.41-15.28,33.62-4.61,10.22-8.91,20.71-13.99,30.68-6.53.24-13.06.05-19.59-.1,8.7-19.22,16.81-39.06,26.46-57.8-10.69-27.02-22.65-53.7-34.43-80.26,6.49-.17,12.99-.22,19.49-.14,8.99,19.3,16.78,39.28,25.11,58.88,8.97-19.43,17.19-39.25,25.82-58.84Z"/>
              <path className="fill-white" d="M496.51,148.45c1.98-.14,3.95-.22,5.93-.23,14.3-.18,30.23-.96,41.2,9.95,4.28,4.26,7.08,9.73,8.5,15.56,2.25,9.22,1.25,19.35,1.21,28.77l-.12,36.12-17.29-.13-.07-9.13c-4.1,4.07-8.55,7.42-14.04,9.39-8.67,3.1-17.62,1.85-25.78-2.04-1.54-.84-3.02-1.8-4.42-2.86-1.4-1.06-2.73-2.21-3.96-3.47-.37-.37-.73-.75-1.09-1.14-.35-.39-.7-.79-1.03-1.19-.33-.41-.66-.82-.97-1.24-.31-.42-.61-.85-.91-1.29-.29-.44-.57-.88-.84-1.33-.27-.45-.53-.91-.77-1.37-.25-.46-.48-.93-.71-1.41-.22-.48-.43-.96-.63-1.44-.2-.49-.39-.98-.56-1.47-.17-.49-.34-.99-.49-1.5-.15-.5-.29-1.01-.41-1.52-.12-.51-.24-1.02-.34-1.54-.1-.52-.19-1.03-.26-1.55-.07-.52-.13-1.04-.18-1.56-.05-.52-.08-1.05-.11-1.57-.02-.52-.03-1.05-.03-1.57,0-.54.01-1.07.04-1.6.03-.53.06-1.07.11-1.6.05-.53.12-1.06.2-1.59.08-.53.17-1.06.27-1.58.1-.53.22-1.05.35-1.57.13-.52.27-1.04.43-1.55.16-.51.32-1.02.5-1.52.18-.5.37-1,.58-1.5.2-.49.42-.98.65-1.47.23-.48.47-.96.72-1.43.25-.47.52-.94.79-1.4.28-.46.56-.91.86-1.36.3-.44.61-.88.92-1.31.32-.43.65-.85.99-1.27.34-.41.69-.82,1.05-1.21.36-.4.73-.78,1.11-1.16,6.22-6.1,14.92-9.33,23.59-9.25,10.29.1,17.61,4.8,24.65,11.89-.28-6.33-.61-12.98-5.71-17.51-6.82-6.05-18-4.66-26.43-4.16l-7.51-17.08ZM509.82,191.25c-5.4,1.58-9.85,3.56-12.66,8.81-.25.47-.48.95-.68,1.45-.2.49-.38,1-.53,1.51-.15.51-.28,1.03-.38,1.55-.1.52-.17,1.05-.22,1.58-.05.53-.07,1.06-.06,1.6,0,.53.04,1.06.1,1.59.06.53.15,1.05.26,1.58.11.52.25,1.03.42,1.54.09.28.19.56.3.84s.22.55.34.82c.12.27.25.54.39.8.14.26.28.52.43.78.15.26.31.51.47.76.16.25.33.49.51.73.17.24.36.47.54.7.19.23.38.45.58.67.2.22.4.43.61.64.21.21.43.41.65.61.22.2.45.39.68.58.23.19.47.37.71.54.24.17.48.34.73.5.25.16.5.32.76.46.26.15.52.29.78.42.26.13.53.26.8.38,3.32,1.5,6.62,1.8,10.21,1.53,5.3-1.52,9.73-3.65,12.43-8.78.24-.45.45-.9.64-1.37.19-.47.36-.94.5-1.43.14-.48.26-.98.36-1.47.09-.5.16-1,.21-1.5.04-.5.06-1.01.06-1.51,0-.5-.04-1.01-.09-1.51-.06-.5-.14-1-.24-1.49-.11-.49-.24-.98-.39-1.46-1.45-4.54-4.89-8.32-9.13-10.43-3.05-1.52-6.67-2.37-10.08-2.02Z"/>
              <path className="fill-white" d="M330.56,96.07c5.75-.09,11.53.05,17.28.08.4,22.81-.32,45.63.03,68.44.17,11.39,2.39,23.14.99,34.47-.11.96-.25,1.92-.42,2.87-.17.95-.36,1.9-.58,2.84-.22.94-.47,1.88-.75,2.81-.28.93-.58,1.85-.92,2.76-.33.91-.69,1.81-1.08,2.7-.39.89-.8,1.76-1.23,2.63-.44.86-.9,1.71-1.39,2.55-.49.84-1,1.66-1.53,2.47-6.59,9.72-17.29,16.46-28.8,18.63-12.97,2.44-25.42-1.04-36.19-8.34-8.91-7.38-15.18-16.14-17.5-27.64-.15-.78-.29-1.56-.4-2.35-.12-.79-.21-1.57-.29-2.36-.08-.79-.13-1.58-.17-2.38s-.06-1.59-.06-2.38c0-.79.02-1.59.06-2.38.04-.79.1-1.58.17-2.38.08-.79.18-1.58.29-2.36.12-.79.25-1.57.4-2.35.15-.78.33-1.55.52-2.32.19-.77.4-1.54.63-2.3.23-.76.48-1.51.74-2.26.27-.75.55-1.49.85-2.22.3-.73.62-1.46.96-2.18.34-.72.69-1.43,1.07-2.13.37-.7.76-1.39,1.17-2.08.41-.68.83-1.35,1.27-2.02.41-.6.83-1.19,1.26-1.78.44-.58.89-1.15,1.35-1.71.46-.56.94-1.11,1.43-1.64.49-.54,1-1.06,1.51-1.57.52-.51,1.05-1.01,1.59-1.49.54-.48,1.09-.96,1.66-1.41s1.14-.9,1.73-1.33c.59-.43,1.18-.84,1.79-1.24.61-.4,1.22-.78,1.85-1.15.63-.37,1.26-.72,1.9-1.06.64-.34,1.3-.66,1.96-.97.66-.31,1.33-.59,2-.87.67-.27,1.35-.53,2.04-.77.69-.24,1.38-.46,2.08-.67.7-.2,1.4-.39,2.11-.56.71-.17,1.42-.32,2.13-.46,13.22-2.48,25.37.95,36.3,8.5l.19-60.63ZM300.88,165.79c-8.1,1.2-15.23,4.55-20.16,11.38-.27.38-.54.76-.79,1.16-.25.39-.5.79-.73,1.19-.23.4-.46.81-.67,1.23-.21.41-.42.83-.61,1.26-.19.42-.38.85-.55,1.29-.17.43-.33.87-.49,1.31-.15.44-.29.89-.42,1.33s-.25.9-.36,1.35c-.11.45-.21.91-.29,1.37-.09.46-.16.92-.23,1.38-.06.46-.12.93-.16,1.39-.04.46-.07.93-.09,1.4-.02.47-.03.93-.02,1.4,0,.47.02.93.05,1.4.03.47.06.93.11,1.4.05.46.11.93.18,1.39,1.19,7.33,5.28,14.32,11.44,18.56,5.76,3.96,12.76,5.41,19.67,4.87,8.56-1.9,15.64-5.21,20.53-12.86.25-.39.5-.79.73-1.2.24-.41.46-.82.67-1.23.21-.42.42-.84.61-1.27.19-.43.38-.86.55-1.3.17-.44.33-.88.48-1.32.15-.44.29-.89.42-1.34s.24-.91.35-1.36c.11-.46.2-.92.28-1.38.08-.46.15-.93.21-1.39.06-.46.11-.93.14-1.4.04-.47.06-.94.07-1.41.01-.47.01-.94,0-1.41-.01-.47-.03-.94-.07-1.4-.03-.47-.08-.93-.14-1.4-.06-.47-.12-.93-.2-1.39-.08-.46-.17-.92-.27-1.38-.09-.44-.2-.87-.31-1.31-.12-.43-.24-.86-.38-1.29-.14-.43-.28-.85-.44-1.27-.16-.42-.33-.84-.5-1.25-.18-.41-.37-.82-.56-1.22-.2-.4-.41-.8-.62-1.19-.22-.39-.44-.78-.68-1.16-.24-.38-.48-.76-.74-1.12-.25-.37-.52-.73-.79-1.09-.27-.36-.56-.71-.85-1.05-.29-.34-.59-.68-.9-1-.31-.33-.62-.65-.94-.96-.32-.31-.65-.61-.99-.91-.34-.3-.68-.58-1.03-.86-.35-.28-.71-.55-1.08-.81-.36-.26-.74-.51-1.11-.76-5.4-3.41-11.99-4.88-18.33-4.36Z"/>
              <path className="fill-white" d="M43.66,96.86c9.32-.7,19.29,1.49,27.44,6.04.66.38,1.32.77,1.96,1.18.64.41,1.28.84,1.9,1.28.62.44,1.23.9,1.83,1.37.6.47,1.19.96,1.77,1.46.58.5,1.14,1.01,1.69,1.54s1.09,1.07,1.61,1.62c.52.55,1.04,1.12,1.53,1.7.5.58.98,1.17,1.45,1.77.47.6.92,1.22,1.36,1.84.44.63.86,1.26,1.26,1.91.41.65.8,1.3,1.17,1.97s.73,1.34,1.07,2.02c.34.68.66,1.37.97,2.07.31.7.6,1.41.87,2.12.27.71.53,1.43.76,2.16.24.73.46,1.46.66,2.19.26.98.49,1.97.68,2.97.2,1,.36,2,.49,3.01.13,1.01.23,2.02.3,3.03.07,1.01.11,2.03.11,3.04,0,1.02-.02,2.03-.08,3.05-.06,1.01-.15,2.02-.28,3.03-.12,1.01-.28,2.01-.47,3.01-.19,1-.41,1.99-.66,2.97-4.17,16.68-16.15,35.07-24.29,50.48-5.78,10.93-11.11,22.19-17.27,32.91-4.26.16-8.53.37-12.79.38-2.06,0-5.02.24-6.53-1.26l.62-1.83c7.78-14.84,15.42-29.75,22.95-44.72-14.2.09-26.75-.81-38.32-9.98-.59-.48-1.17-.97-1.73-1.47-.57-.5-1.12-1.02-1.66-1.55-.54-.53-1.07-1.07-1.58-1.63-.51-.56-1.01-1.12-1.5-1.7-.49-.58-.96-1.17-1.42-1.78-.46-.6-.9-1.22-1.33-1.84-.43-.62-.84-1.26-1.24-1.9-.4-.65-.78-1.3-1.14-1.96-.37-.66-.72-1.33-1.05-2.01-.33-.68-.65-1.37-.95-2.06-.3-.7-.58-1.4-.85-2.11-.27-.71-.51-1.42-.74-2.15-.23-.72-.44-1.45-.64-2.18-.2-.73-.37-1.47-.53-2.21-.16-.74-.3-1.48-.43-2.23-.12-.75-.23-1.5-.32-2.25-1.46-12.73,1.86-25.78,9.93-35.84,8.37-10.44,20.24-16.1,33.4-17.46ZM43.5,115.24c-8.73,1.83-15.83,5.19-20.9,12.95-.26.4-.51.81-.74,1.22-.24.41-.47.83-.68,1.26-.22.42-.43.85-.62,1.29-.2.43-.38.87-.56,1.32-.18.44-.34.89-.5,1.35-.15.45-.3.91-.43,1.37-.13.46-.25.92-.36,1.39-.11.46-.21.93-.3,1.4-.09.47-.16.94-.23,1.41s-.12.95-.16,1.42c-.04.48-.07.95-.09,1.43s-.03.95-.02,1.43c0,.48.02.96.05,1.43.03.48.07.95.12,1.43.05.48.11.95.19,1.42.07.47.16.94.25,1.41.1.48.22.95.35,1.42.13.47.27.94.42,1.4.15.46.31.92.49,1.38.17.46.36.91.56,1.35.2.45.4.89.62,1.32.22.44.45.87.69,1.29.24.42.49.84.75,1.25.26.41.53.82.82,1.22s.57.79.88,1.17c.3.38.61.76.93,1.13.32.37.65.73.99,1.08s.69.69,1.04,1.03c.36.33.72.66,1.09.97.37.32.75.62,1.14.92.39.3.78.58,1.18.86.4.28.81.54,1.23.8,6.21,3.81,12.68,4.58,19.79,4.32,8.58-1.92,15.53-4.99,20.46-12.81.27-.42.52-.84.77-1.28.24-.43.48-.87.7-1.31.22-.44.43-.89.64-1.35.2-.45.39-.91.57-1.38.18-.46.34-.93.5-1.4.15-.47.3-.95.43-1.43.13-.48.25-.96.36-1.44.11-.48.2-.97.28-1.46.08-.49.15-.98.21-1.47.06-.49.1-.99.14-1.48.03-.5.05-.99.06-1.49,0-.5,0-.99-.01-1.49-.02-.5-.04-.99-.08-1.49-.04-.49-.09-.99-.16-1.48-.06-.49-.14-.98-.23-1.47-.09-.49-.19-.97-.3-1.46-.11-.47-.23-.94-.36-1.4s-.28-.93-.43-1.38c-.16-.46-.32-.91-.5-1.36-.18-.45-.37-.89-.57-1.33-.2-.44-.41-.87-.64-1.3-.22-.43-.46-.85-.7-1.27-.24-.42-.5-.83-.76-1.23-.27-.4-.54-.8-.83-1.19-.29-.39-.58-.77-.88-1.15-.3-.37-.62-.74-.94-1.1s-.66-.71-1-1.05c-.34-.34-.69-.68-1.05-1-.36-.33-.72-.64-1.1-.95-.37-.31-.76-.6-1.14-.89-.39-.29-.78-.56-1.19-.83s-.81-.52-1.23-.77c-5.93-3.52-12.15-4.39-18.95-3.96Z"/>
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