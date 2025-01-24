const TypingIndicator = () => {
  return (
    <div className="flex justify-end pr-2 sm:pr-3 lg:pr-4 animate-fade-in">
      <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#4CD6B4] animate-bounce" />
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:0.2s]" />
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
};

export default TypingIndicator;