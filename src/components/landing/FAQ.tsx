import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "كيف يمكنني البدء باستخدام النظام؟",
    answer: "يمكنك البدء بإنشاء حساب جديد والاستفادة من الفترة التجريبية المجانية. بعد ذلك، يمكنك إضافة قضاياك وإدارتها بسهولة."
  },
  {
    question: "هل النظام آمن لحفظ بيانات القضايا؟",
    answer: "نعم، نستخدم أحدث تقنيات التشفير وأنظمة الحماية لضمان أمان بياناتك وخصوصيتها."
  },
  {
    question: "هل يمكنني مشاركة القضايا مع زملائي في المكتب؟",
    answer: "نعم، يمكنك إضافة مستخدمين آخرين وتحديد صلاحياتهم للوصول إلى القضايا المحددة."
  },
  {
    question: "كيف يمكنني الحصول على الدعم الفني؟",
    answer: "نوفر دعماً فنياً على مدار الساعة عبر البريد الإلكتروني والدردشة المباشرة."
  }
];

export default function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            إجابات على الأسئلة الأكثر شيوعاً حول نظام إدارة القضايا
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-[#4CD6B4] transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}