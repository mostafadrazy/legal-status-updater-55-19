import React from 'react';
import Navbar from "@/components/landing/Navbar";
import { motion, MotionConfig } from "framer-motion";
import { LinkedinIcon, InstagramIcon, Globe } from "lucide-react";

const BehanceIcon = ({ className = "", size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M2.5 19C1.67157 19 1 18.3284 1 17.5V6.5C1 5.67157 1.67157 5 2.5 5H8C13 5 13 11.5 10 11.5C13 11.5 14 19 8 19H2.5ZM4.5 11C4.22386 11 4 10.7761 4 10.5V7.5C4 7.22386 4.22386 7 4.5 7H7C7 7 9 7 9 9C9 11 7 11 7 11H4.5ZM4.5 13C4.22386 13 4 13.2239 4 13.5V16.5C4 16.7761 4.22386 17 4.5 17H8C8 17 9.5 17 9.5 15C9.5 13 8 13 8 13H4.5Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M21.499 14.0034C22.3279 14.0034 23.0212 13.3199 22.8522 12.5085C21.6065 6.52886 12.9128 7.08088 13 14.0034C13.0665 19.2762 20.4344 20.9671 22.6038 16.1898C22.9485 15.4308 22.1747 14.9997 21.5372 14.9997C20.9706 14.9997 20.5313 15.5223 20.1693 15.9582C19.1272 17.2132 15.9628 17.1221 15.5449 14.5142C15.5005 14.2375 15.7304 14.0034 16.0106 14.0034H21.499ZM15.8184 11.9997C15.671 11.9997 15.5758 11.8453 15.6545 11.7207C16.7141 10.0424 19.2614 10.0605 20.3398 11.7189C20.4207 11.8434 20.3257 11.9997 20.1772 11.9997H15.8184Z" fill="currentColor"/>
    <path d="M16 6C15.4477 6 15 6.44772 15 7C15 7.55228 15.4477 8 16 8H20C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6H16Z" fill="currentColor"/>
  </svg>
);

const DiscordIcon = ({ className = "", size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 -28.5 256 256" 
    fill="currentColor" 
    className={className}
  >
    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
  </svg>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white overflow-hidden">
      <Navbar />
      <MotionConfig reducedMotion="user">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="space-y-20">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">قصتنا</h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                رحلة من الشغف والإبداع في عالم التكنولوجيا والقانون
              </p>
            </motion.div>

            {/* Story Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 md:p-12 rounded-[2rem] max-w-5xl mx-auto shadow-2xl hover:shadow-[#4CD6B4]/20 transition-all duration-500"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold gradient-text leading-relaxed py-1">
                      مصطفى الدرازي
                    </h2>
                    <p className="text-xl text-[#4CD6B4]">المؤسس والمطور الرئيسي</p>
                  </div>
                  
                  <div className="space-y-6 text-gray-300">
                    <p className="leading-relaxed text-lg">
                      منذ صغري، كنت شغوفاً بالتكنولوجيا والإبداع. في سن 24، جمعت بين شغفي بالتصميم والبرمجة لخلق حلول تقنية مبتكرة تخدم المجتمع القانوني.
                    </p>
                    <p className="leading-relaxed text-lg">
                      بدأت رحلتي كمصمم جرافيك، حيث تعلمت أهمية التواصل البصري الفعال. ثم توسعت مهاراتي لتشمل تحرير الفيديو، مما أضاف بعداً حركياً لأعمالي. مع تطور التكنولوجيا، غصت في عالم تطوير الويب، حيث وجدت شغفاً جديداً في بناء حلول رقمية متكاملة.
                    </p>
                    <p className="leading-relaxed text-lg">
                      اليوم، كمعلم للذكاء الاصطناعي، أشارك معرفتي مع الآخرين، مؤمناً بأن التكنولوجيا يمكن أن تغير حياة الناس للأفضل. هذا المشروع هو ثمرة سنوات من الخبرة والتعلم المستمر، حيث جمعت كل مهاراتي لإنشاء منصة قانونية متطورة تجمع بين البساطة والفعالية.
                    </p>
                  </div>

                  <div className="flex gap-6 pt-4">
                    <a href="https://www.linkedin.com/in/eddarrazy/" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-[#4CD6B4] transition-colors duration-300 hover:scale-110 transform">
                      <LinkedinIcon className="w-7 h-7" />
                    </a>
                    <a href="https://www.instagram.com/drazzzy__/" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-[#4CD6B4] transition-colors duration-300 hover:scale-110 transform">
                      <InstagramIcon className="w-7 h-7" />
                    </a>
                    <a href="https://www.behance.net/mostafadrazy" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-400 hover:text-[#4CD6B4] transition-colors duration-300 hover:scale-110 transform">
                      <BehanceIcon className="w-7 h-7" />
                    </a>
                    <div className="group relative">
                      <DiscordIcon className="w-7 h-7 text-gray-400 group-hover:text-[#4CD6B4] transition-colors duration-300 group-hover:scale-110 transform cursor-pointer" />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        drazzzy
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="aspect-square rounded-[2rem] overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4CD6B4]/30 to-[#4CD6B4]/10 animate-pulse" />
                    <img 
                      src="/lovable-uploads/a9235b75-2871-4b7a-8e8f-c14daf378a79.png"
                      alt="Mustapha Eddarrazy"
                      className="w-full h-full object-cover object-center relative z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent mix-blend-overlay" />
                  </div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4CD6B4]/20 to-transparent rounded-[2rem] blur opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>

            {/* Platform Features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              <div className="glass-card p-8 rounded-[1.5rem] hover:shadow-lg hover:shadow-[#4CD6B4]/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#4CD6B4] mb-4">إدارة القضايا</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    تنظيم وتتبع جميع القضايا في مكان واحد
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    إدارة المواعيد والجلسات بكفاءة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    تحديثات فورية لحالة القضايا
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 rounded-[1.5rem] hover:shadow-lg hover:shadow-[#4CD6B4]/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#4CD6B4] mb-4">إدارة المستندات</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    تخزين آمن للمستندات القانونية
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    مشاركة الملفات مع العملاء بأمان
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    نظام أرشفة متقدم
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 rounded-[1.5rem] hover:shadow-lg hover:shadow-[#4CD6B4]/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#4CD6B4] mb-4">تجربة العملاء</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    بوابة خاصة للعملاء
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    تواصل مباشر مع المحامي
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    متابعة تطورات القضية بسهولة
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 rounded-[1.5rem] hover:shadow-lg hover:shadow-[#4CD6B4]/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#4CD6B4] mb-4">الأمن والخصوصية</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    تشفير متقدم للبيانات
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    نسخ احتياطية منتظمة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4CD6B4] rounded-full"></span>
                    معايير أمان عالمية
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Vision Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-8 md:p-12 rounded-[2rem] max-w-5xl mx-auto text-center hover:shadow-lg hover:shadow-[#4CD6B4]/10 transition-all duration-500"
            >
              <Globe className="w-16 h-16 text-[#4CD6B4] mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#4CD6B4] mb-6">رؤيتنا للمستقبل</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                نسعى لتحويل القطاع القانوني من خلال التكنولوجيا المتقدمة. هدفنا هو تمكين المحامين من التركيز على جوهر عملهم القانوني بينما نتولى تبسيط وأتمتة العمليات الإدارية. نؤمن بأن المستقبل يكمن في الجمع بين الخبرة القانونية والتكنولوجيا الذكية.
              </p>
            </motion.div>
          </div>
        </div>
      </MotionConfig>
    </div>
  );
};

export default AboutUs;
