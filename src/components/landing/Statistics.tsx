import { Users, Scale, Clock, FileText } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1000+",
    label: "عميل",
    description: "يثقون بخدماتنا"
  },
  {
    icon: Scale,
    value: "5000+",
    label: "قضية",
    description: "تمت إدارتها بنجاح"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "دعم",
    description: "متواصل على مدار الساعة"
  },
  {
    icon: FileText,
    value: "98%",
    label: "نسبة النجاح",
    description: "في إدارة القضايا"
  }
];

export default function Statistics() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-xl glass-card border border-legal-200/10 hover:border-legal-200/20"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-br from-[#4CD6B4] to-[#2C9A82] mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-[#4CD6B4] mb-2">{stat.label}</div>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}