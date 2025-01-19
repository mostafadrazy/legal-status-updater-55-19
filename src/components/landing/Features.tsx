import { 
  FileText, 
  Users, 
  Calendar, 
  Search, 
  Shield, 
  MessageSquare,
  Clock,
  Upload
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "إدارة القضايا بكفاءة",
    description: "إنشاء وتتبع ومراقبة جميع القضايا من مكان واحد"
  },
  {
    icon: Users,
    title: "إدارة العملاء",
    description: "تنظيم معلومات العملاء وبياناتهم بشكل آمن"
  },
  {
    icon: Calendar,
    title: "تتبع المواعيد",
    description: "جدولة وتتبع جلسات المحكمة والمواعيد النهائية"
  },
  {
    icon: Upload,
    title: "إدارة المستندات",
    description: "تخزين وتنظيم جميع الوثائق والمستندات القانونية"
  },
  {
    icon: Shield,
    title: "بوابة آمنة للعملاء",
    description: "منح العملاء وصولاً آمناً لمتابعة قضاياهم"
  },
  {
    icon: Search,
    title: "بحث متقدم",
    description: "البحث السريع في القضايا والمستندات والعملاء"
  },
  {
    icon: Clock,
    title: "متابعة التحديثات",
    description: "تتبع جميع التحديثات والتغييرات في القضايا"
  },
  {
    icon: MessageSquare,
    title: "التواصل مع العملاء",
    description: "إبقاء العملاء على اطلاع بمستجدات قضاياهم"
  }
];

export default function Features() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-6">مميزات النظام</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نظام متكامل لإدارة القضايا والعملاء يساعد المحامين على تنظيم عملهم بكفاءة عالية
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group flex flex-col p-8 rounded-2xl glass-card border border-legal-200/10 hover:border-legal-200/20 animate-fade-in hover:scale-105 transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="text-white h-6 w-6 flex-shrink-0" />
                </div>

                {/* Content */}
                <h3 className="text-white text-xl font-bold mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}