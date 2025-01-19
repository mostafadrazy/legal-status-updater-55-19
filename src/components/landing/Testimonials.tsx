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
          <h2 className="text-3xl font-bold gradient-text mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            آراء عملائنا تعكس جودة خدماتنا وتميزنا في مجال إدارة القضايا القانونية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl animate-fade-in hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Rating stars */}
              <div className="flex mb-6 space-x-1 rtl:space-x-reverse">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-[#4CD6B4] fill-current animate-pulse" 
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <p className="text-gray-200 mb-8 leading-relaxed text-lg">
                {testimonial.content}
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] flex items-center justify-center text-white text-xl font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-[#4CD6B4]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}