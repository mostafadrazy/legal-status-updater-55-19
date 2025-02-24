import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BlogPostDialog from "@/components/blog/BlogPostDialog";
import { BlogPost } from "@/types/blog";
import { Skeleton } from "@/components/ui/skeleton";

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "مرحباً بكم في منصة قضية",
    author: "مصطفى الدرازي",
    role: "المؤسس والمطور الرئيسي لمنصة قضية",
    content: `يسرني أن أرحب بكم في منصة قضية، المنصة القانونية المتكاملة التي تم تطويرها خصيصاً لتلبية احتياجات المحامين في العصر الرقمي. كمؤسس لهذه المنصة، أود أن أشارككم رؤيتنا وطموحنا في تطوير القطاع القانوني من خلال التكنولوجيا الحديثة، حيث نسعى جاهدين لتقديم حلول مبتكرة تساهم في تسهيل وتحسين الممارسة القانونية.

في ظل التطور التكنولوجي المتسارع، أصبح من الضروري مواكبة التغيرات في جميع المجالات، وخاصة في المجال القانوني. لذلك، قمنا بتطوير منصة قضية لتكون حلاً شاملاً يلبي احتياجات المحامين في إدارة قضاياهم وتنظيم مواعيدهم بكفاءة عالية. تتميز منصتنا بواجهة سهلة الاستخدام وأدوات متقدمة تساعد في تنظيم العمل وتحسين الإنتاجية.

تقدم منصة قضية مجموعة متكاملة من الخدمات التي تشمل إدارة القضايا بكفاءة عالية، وتنظيم المواعيد والجلسات، وإدارة الوثائق والمستندات بشكل آمن ومنظم. كما توفر المنصة نظاماً متطوراً للتنبيهات يضمن عدم تفويت أي موعد أو جلسة مهمة، بالإضافة إلى إمكانية مشاركة المعلومات والملفات مع الفريق القانوني بسهولة وأمان.

نحن نؤمن بأن التكنولوجيا يمكن أن تساعد في تحسين كفاءة العمل القانوني وتوفير الوقت والجهد، مما يتيح للمحامين التركيز على جوهر عملهم: تقديم أفضل خدمة قانونية لعملائهم. من خلال منصة قضية، نسعى لتوفير أدوات وحلول تقنية متطورة تساعد في تحقيق هذا الهدف، مع الحفاظ على أعلى معايير الأمان والخصوصية.

في الختام، أود أن أشكر كل من ساهم في تطوير هذه المنصة، وأدعو جميع المحامين للانضمام إلينا في هذه الرحلة نحو مستقبل أكثر تطوراً للمهنة القانونية. نحن ملتزمون بالتطوير المستمر لمنصتنا وإضافة المزيد من الميزات والتحسينات التي تلبي احتياجات مستخدمينا المتنامية.`,
    image_url: "/logo.svg",
    author_image: "/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png",
    created_at: "2024-03-20T10:00:00.000Z"
  },
  {
    id: "2",
    title: "التحديات القانونية في العصر الرقمي",
    author: "مصطفى الدرازي",
    role: "المؤسس والمطور الرئيسي لمنصة قضية",
    content: `يشهد العالم اليوم تحولاً رقمياً غير مسبوق في جميع المجالات، وقد أدى هذا التحول إلى ظهور تحديات قانونية جديدة تتطلب من المحامين تطوير مهاراتهم وأدواتهم باستمرار. من خلال خبرتي في مجال التكنولوجيا والقانون، أرى أن هناك حاجة ملحة لفهم وتحليل هذه التحديات ووضع استراتيجيات فعالة للتعامل معها.

تعد حماية البيانات والخصوصية من أبرز التحديات التي تواجه المهنة القانونية في العصر الرقمي. مع تزايد الاعتماد على التكنولوجيا في جميع جوانب الحياة، أصبحت مسألة حماية المعلومات الشخصية والبيانات السرية أولوية قصوى. يجب على المحامين اليوم أن يكونوا على دراية كاملة بالقوانين واللوائح المتعلقة بحماية البيانات وكيفية تطبيقها في ممارساتهم اليومية.

كما تشكل الجرائم الإلكترونية والعقود الذكية تحديات جديدة تتطلب فهماً عميقاً للتقنيات الحديثة. تتطور أساليب الجرائم الإلكترونية باستمرار، مما يتطلب من المحامين تحديث معرفتهم بالتقنيات الحديثة وطرق مكافحة هذه الجرائم. كذلك، مع ظهور تقنية البلوكتشين والعقود الذكية، أصبح من الضروري فهم كيفية عمل هذه التقنيات وتأثيرها على الممارسة القانونية.

يمكن للمحامين مواجهة هذه التحديات من خلال التعليم المستمر واستخدام التكنولوجيا بذكاء. يشمل ذلك حضور الدورات التدريبية في مجال التكنولوجيا القانونية، ومتابعة آخر المستجدات في مجال القانون الرقمي، والتعرف على أحدث الأدوات والبرامج القانونية. كما يجب عليهم بناء شبكة علاقات مهنية قوية مع خبراء التكنولوجيا القانونية والمشاركة في المؤتمرات والندوات المتخصصة.

في النهاية، يجب النظر إلى هذه التحديات على أنها فرص للتطور والنمو المهني. من خلال منصة قضية، نسعى لمساعدة المحامين في مواجهة هذه التحديات وتحويلها إلى نقاط قوة في ممارستهم المهنية. نحن نؤمن بأن المستقبل يحمل فرصاً كبيرة للمحامين الذين يستعدون للتغيير ويتبنون التكنولوجيا الحديثة في عملهم.`,
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author_image: "/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png",
    created_at: "2024-03-20T09:00:00.000Z"
  },
  {
    id: "3",
    title: "مستقبل المحاماة في ظل الذكاء الاصطناعي",
    author: "مصطفى الدرازي",
    role: "المؤسس والمطور الرئيسي لمنصة قضية",
    content: `يشهد عالم المحاماة تحولاً جذرياً مع تطور تقنيات الذكاء الاصطناعي، مما يثير تساؤلات مهمة حول مستقبل المهنة وكيفية تكيف المحامين مع هذه التغيرات. من خلال تجربتي في تطوير منصة قضية وخبرتي في مجال التكنولوجيا، أرى أن الذكاء الاصطناعي سيكون أداة مساعدة قوية للمحامين وليس بديلاً عنهم، حيث سيساهم في تحسين كفاءة العمل القانوني وتطوير الخدمات المقدمة.

يمكن للذكاء الاصطناعي أن يساعد في تحليل الوثائق القانونية وتسريع عملية مراجعة المستندات واكتشاف الأنماط والعلاقات في القضايا السابقة. كما يمكنه المساعدة في التنبؤ بنتائج القضايا من خلال تحليل البيانات التاريخية وتقييم احتمالات النجاح. هذه القدرات ستمكن المحامين من اتخاذ قرارات أفضل وتطوير استراتيجيات قانونية أكثر فعالية.

أحد أهم جوانب الذكاء الاصطناعي في المجال القانوني هو قدرته على أتمتة المهام الروتينية مثل إعداد المستندات القانونية البسيطة وجدولة المواعيد والمتابعات. هذا يتيح للمحامين التركيز على المهام الأكثر أهمية التي تتطلب الخبرة والحكم البشري. كما يساهم في تحسين جودة الخدمات القانونية وزيادة رضا العملاء من خلال تسريع العمليات وتقليل الأخطاء.

لكي يستفيد المحامون من هذه التقنيات، يجب عليهم تطوير مهاراتهم وفهم إمكانيات وحدود التكنولوجيا. هذا يشمل تعلم استخدام أدوات الذكاء الاصطناعي وتطوير مهارات التحليل والتفسير. كما يجب عليهم الجمع بين الخبرة القانونية والتقنية لتقديم خدمات أفضل لعملائهم.

في المستقبل، سيتغير دور المحامي ليركز أكثر على المهام الإبداعية والاستراتيجية، مع ظهور تخصصات قانونية جديدة وتطوير نماذج أعمال مبتكرة. نحن في منصة قضية نؤمن بأن المستقبل سيكون مزيجاً من الخبرة البشرية والذكاء الاصطناعي، وسنواصل تطوير أدواتنا وخدماتنا لمساعدة المحامين في هذا التحول الرقمي.`,
    image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    author_image: "/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png",
    created_at: "2024-03-20T08:00:00.000Z"
  },
  {
    id: "4",
    title: "أهمية التوثيق القانوني في المحاكم",
    author: "مصطفى الدرازي",
    role: "المؤسس والمطور الرئيسي لمنصة قضية",
    content: `يعد التوثيق القانوني ركيزة أساسية في العمل القانوني، حيث يضمن حفظ الحقوق وتسهيل الرجوع إلى المعلومات عند الحاجة. من خلال خبرتي في تطوير الحلول التقنية للقطاع القانوني، أرى أن التوثيق الفعال يلعب دوراً محورياً في نجاح الممارسة القانونية وحماية مصالح جميع الأطراف المعنية.

تكمن أهمية التوثيق القانوني في قدرته على حماية الحقوق وتنظيم العمل القانوني. يشمل ذلك توثيق جميع الإجراءات والقرارات، وحفظ الأدلة والمستندات، وتسجيل المراسلات والاتصالات، وتوثيق الاتفاقيات والعقود. هذا التنظيم يساعد في ترتيب الملفات بشكل منهجي ويسهل الوصول إلى المعلومات المطلوبة بسرعة وكفاءة.

يتطلب التوثيق القانوني الفعال اتباع أفضل الممارسات في تنظيم وحفظ المعلومات. يشمل ذلك استخدام نظام موحد للتصنيف وتسمية الملفات، وتنظيم المستندات حسب التاريخ والموضوع، وإنشاء فهارس للملفات. كما يجب الاهتمام بالحفظ الآمن للمعلومات من خلال استخدام أنظمة تخزين آمنة وعمل نسخ احتياطية منتظمة.

تلعب التكنولوجيا دوراً مهماً في تحسين عملية التوثيق القانوني من خلال أنظمة إدارة الوثائق المتطورة. هذه الأنظمة توفر تخزيناً رقمياً آمناً، وسهولة في البحث والاسترجاع، وإمكانية المشاركة والتعاون بين أعضاء الفريق القانوني. كما تسمح بالتوقيع الإلكتروني وتوثيق المستندات إلكترونياً، مما يسرع العمليات القانونية ويقلل من استخدام الورق.

في النهاية، يجب النظر إلى التوثيق القانوني كاستثمار في مستقبل الممارسة القانونية. من خلال منصة قضية، نسعى لتوفير أفضل الأدوات والحلول التقنية لمساعدة المحامين في توثيق وإدارة قضاياهم بكفاءة عالية. نحن ملتزمون بتطوير وتحسين خدماتنا باستمرار لتلبية احتياجات المحامين المتغيرة في العصر الرقمي.`,
    image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    author_image: "/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png",
    created_at: "2024-03-20T07:00:00.000Z"
  },
  {
    id: "5",
    title: "دور التكنولوجيا في تطوير المهنة القانونية",
    author: "مصطفى الدرازي",
    role: "المؤسس والمطور الرئيسي لمنصة قضية",
    content: `تلعب التكنولوجيا دوراً محورياً في تطوير المهنة القانونية وتحسين كفاءة العمل القانوني في عصرنا الحالي. من خلال تجربتي في تطوير منصة قضية، شهدت كيف يمكن للتكنولوجيا أن تحدث تغييراً إيجابياً في طريقة عمل المحامين وتقديم الخدمات القانونية، مما يؤدي إلى تحسين جودة الخدمات وزيادة رضا العملاء.

تساهم التكنولوجيا في تحسين إدارة المكاتب القانونية من خلال توفير أدوات متطورة لإدارة الوقت والعملاء والمستندات. تشمل هذه الأدوات أنظمة لجدولة المواعيد وتتبع ساعات العمل وإدارة المهام والمشاريع، بالإضافة إلى حفظ معلومات العملاء ومتابعة التواصل معهم وإدارة الفواتير والمدفوعات بكفاءة عالية.

يعد البحث القانوني وصياغة المستندات من المجالات التي استفادت بشكل كبير من التطور التكنولوجي. توفر الأدوات الحديثة إمكانية الوصول السريع للتشريعات وتحليل السوابق القضائية ومتابعة التعديلات القانونية. كما تساعد في توحيد صياغة المستندات وتدقيقها لغوياً وقانونياً، مما يضمن جودة العمل وتقليل الأخطاء.

مع تزايد أهمية الأمن السيبراني، أصبحت حماية البيانات والخصوصية من الأولويات القصوى في العمل القانوني. تقدم التكنولوجيا حلولاً متطورة لتشفير المعلومات والتحكم في الصلاحيات ومراقبة الوصول للمعلومات. كما تساعد في ضمان الامتثال للوائح وقوانين حماية البيانات من خلال توثيق الإجراءات وتحديث السياسات الأمنية باستمرار.

في المستقبل، سيستمر دور التكنولوجيا في التطور والتوسع في المجال القانوني. نحن في منصة قضية نؤمن بأهمية مواكبة هذا التطور وتوفير الأدوات والحلول التي تساعد المحامين على الاستفادة من التقنيات الحديثة في عملهم. سنواصل العمل على تطوير منصتنا وإضافة ميزات جديدة تلبي احتياجات المحامين المتغيرة وتساهم في تطوير المهنة القانونية.`,
    image_url: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    author_image: "/lovable-uploads/b088cc7a-5a8d-492c-a99e-f48c6dac1906.png",
    created_at: "2024-03-20T06:00:00.000Z"
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-12 text-center gradient-text">مدونة قضية</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex items-center gap-3 mt-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : (
            BLOG_POSTS.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))
          )}
        </div>
        <BlogPostDialog 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      </div>
      <Footer />
    </>
  );
};

export default Blog;