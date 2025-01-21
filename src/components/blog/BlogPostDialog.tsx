import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { BlogPost } from "@/types/blog";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface BlogPostDialogProps {
  post: BlogPost | null;
  onClose: () => void;
}

const BlogPostDialog = ({ post, onClose }: BlogPostDialogProps) => {
  if (!post) return null;

  return (
    <Dialog open={!!post} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-3xl max-h-[80vh] overflow-y-auto animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2 text-right">
            {post.title}
          </DialogTitle>
          <div className="flex items-center gap-3 mt-3">
            <Avatar className="w-12 h-12 border-2 border-[#4CD6B4]/20">
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
              <span className="text-lg text-white">{post.author}</span>
              <span className="text-sm text-gray-400">{post.role}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-2 text-right">
            {format(new Date(post.created_at), "dd MMMM yyyy", { locale: ar })}
          </p>
        </DialogHeader>
        {post.image_url && (
          <div className="relative h-64 overflow-hidden rounded-lg mb-6">
            <OptimizedImage
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        <div className="text-gray-200 leading-relaxed text-right space-y-4">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-justify">{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostDialog;