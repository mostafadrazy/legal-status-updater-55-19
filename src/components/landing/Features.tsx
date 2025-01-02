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
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">مميزات النظام</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نظام متكامل لإدارة القضايا والعملاء يساعد المحامين على تنظيم عملهم بكفاءة عالية
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex flex-col p-6 rounded-xl glass-card border border-legal-200/10 hover:border-legal-200/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] p-3 rounded-lg w-fit mb-4">
                  <Icon className="text-white h-5 w-5 flex-shrink-0" />
                </div>
                <h3 className="text-legal-800 dark:text-legal-200 text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
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