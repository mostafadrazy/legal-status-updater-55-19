import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { BlogPost } from "@/types/blog";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  return (
    <Card 
      className="glass-card overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      {post.image_url && (
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-white">{post.title}</CardTitle>
        <div className="flex items-center gap-3 mt-3">
          <Avatar className="w-10 h-10 border-2 border-[#4CD6B4]/20">
            <OptimizedImage
              src={post.author_image}
              alt={post.author}
              className="w-full h-full rounded-full"
            />
            <AvatarFallback className="bg-[#4CD6B4]/10 text-[#4CD6B4]">
              {post.author[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-right">
            <span className="text-sm text-white">{post.author}</span>
            <span className="text-xs text-gray-400">{post.role}</span>
          </div>
        </div>
        <CardDescription className="text-gray-300 mt-2 text-right">
          {format(new Date(post.created_at), "dd MMMM yyyy", { locale: ar })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 line-clamp-4 text-justify leading-relaxed">
          {post.content.split('\n\n')[0]}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;