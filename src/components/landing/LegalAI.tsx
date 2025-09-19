import { MessageSquare, Bot, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalAI = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#4CD6B4]/20 px-6 py-3 rounded-full mb-8 backdrop-blur-sm border border-[#4CD6B4]/30">
              <Sparkles className="w-5 h-5 text-[#4CD6B4]" />
              <span className="text-[#4CD6B4] font-semibold">الذكاء الاصطناعي القانوني</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-[#4CD6B4] bg-clip-text text-transparent">
                مساعدك القانوني الذكي
              </span>
            </h2>
            
            <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              استفد من قوة الذكاء الاصطناعي في إدارة قضاياك القانونية
              <br />
              <span className="text-[#4CD6B4] font-semibold">بكفاءة ودقة استثنائية</span>
            </p>
          </div>

          {/* AI Chatbot Interface */}
          <div className="relative mb-12">
            <div className="max-w-4xl mx-auto">
              {/* Chat Window */}
              <div className="relative bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center gap-2 p-4 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 text-sm">المساعد القانوني الذكي</span>
                  </div>
                </div>

                {/* Chat Content */}
                <div className="p-8">
                  {/* AI Avatar */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#4CD6B4] to-[#4CD6B4]/80 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-6">
                    {/* User Message */}
                    <div className="flex justify-start">
                      <div className="bg-[#4CD6B4]/20 backdrop-blur-sm rounded-2xl rounded-bl-md p-4 max-w-md">
                        <p className="text-white text-right">
                          مرحبا
                        </p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex justify-end">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-br-md p-4 max-w-md border border-white/10">
                        <p className="text-gray-300 text-right">
                          مرحبا، كيف يمكنني مساعدتك؟
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="mt-8 flex gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#4CD6B4]/50 transition-colors"
                      />
                    </div>
                    <Button className="bg-[#4CD6B4] hover:bg-[#4CD6B4]/90 px-6 rounded-xl">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#4CD6B4]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4CD6B4]/30 transition-colors duration-300">
                <MessageSquare className="w-8 h-8 text-[#4CD6B4]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">تحليل الوثائق</h3>
              <p className="text-gray-400">تحليل ذكي للوثائق القانونية واكتشاف المخاطر</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#4CD6B4]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4CD6B4]/30 transition-colors duration-300">
                <Bot className="w-8 h-8 text-[#4CD6B4]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">صياغة العقود</h3>
              <p className="text-gray-400">صياغة تلقائية للعقود والوثائق القانونية</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#4CD6B4]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4CD6B4]/30 transition-colors duration-300">
                <CheckCircle className="w-8 h-8 text-[#4CD6B4]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">الاستشارات القانونية</h3>
              <p className="text-gray-400">إجابات فورية للاستفسارات القانونية المعقدة</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LegalAI;
