import { Button } from "@/components/ui/button";

const services = [
  {
    title: "إدارة القضايا",
    description: "نظام متكامل لإدارة وتتبع جميع القضايا والملفات القانونية مع واجهة سهلة الاستخدام.",
    action: "اكتشف المزيد"
  },
  {
    title: "متابعة المواعيد",
    description: "تنظيم وجدولة المواعيد والجلسات مع نظام تنبيهات متقدم لضمان عدم تفويت أي موعد.",
    action: "جرب الآن"
  },
  {
    title: "إدارة الوثائق",
    description: "تخزين وتنظيم جميع الوثائق والمستندات القانونية مع إمكانية الوصول السريع والآمن.",
    action: "ابدأ الاستخدام"
  }
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">خدماتنا</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات لمساعدة المحامين والمكاتب القانونية في إدارة أعمالهم بكفاءة عالية
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="bg-[#8E9196]/10 backdrop-blur-xl border border-white/10 p-8 rounded-xl flex flex-col justify-between transform transition-all duration-500 hover:shadow-[10px_10px_0_white] hover:border-white/20 hover:translate-x-1 animate-fade-in"
                style={{ minHeight: '400px', animationDelay: `${index * 150}ms` }}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                </div>
                <button 
                  className="group flex items-center gap-2 px-6 py-3 text-base font-bold text-white bg-[#4CD6B4] transition-all duration-500 transform hover:shadow-[6px_6px_0_white] shadow-[4px_4px_0_black] skew-x-[-15deg] hover:translate-x-1 w-full justify-center"
                >
                  <span className="skew-x-[15deg]">{service.action}</span>
                  <span className="skew-x-[15deg] relative top-[2px] transition-all duration-500 group-hover:mr-4">
                    <svg width="20" height="13" viewBox="0 0 66 43" xmlns="http://www.w3.org/2000/svg">
                      <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path className="transition-transform duration-400 transform translate-x-[-60%] group-hover:translate-x-0 group-hover:animate-color-fill-1" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;