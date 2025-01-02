import { Star } from "lucide-react";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "محامي",
    content: "نظام متكامل ساعدني في تنظيم وإدارة قضاياي بشكل احترافي. أنصح به بشدة لكل محامي يريد تطوير مكتبه.",
    rating: 5
  },
  {
    name: "سارة أحمد",
    role: "مستشار قانوني",
    content: "واجهة سهلة الاستخدام وميزات متقدمة تساعد في تتبع القضايا والمواعيد. تجربة رائعة!",
    rating: 5
  },
  {
    name: "محمد علي",
    role: "مدير مكتب محاماة",
    content: "ساعدنا النظام في تحسين كفاءة العمل وتوفير الوقت. الدعم الفني ممتاز والتحديثات مستمرة.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            آراء عملائنا تعكس جودة خدماتنا وتميزنا في مجال إدارة القضايا القانونية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl glass-card border border-legal-200/10 hover:border-legal-200/20"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82]" />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}