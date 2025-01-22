const TypingIndicator = () => {
  return (
    <div className="flex justify-end pr-4 animate-fade-in">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#4CD6B4] animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 rounded-full bg-[#4CD6B4] animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
};

export default TypingIndicator;