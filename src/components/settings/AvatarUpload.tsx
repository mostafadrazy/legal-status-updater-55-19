import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps {
  userId: string;
  userEmail?: string;
  fullName?: string;
  initialAvatarUrl?: string | null;
}

export function AvatarUpload({ userId, userEmail, fullName, initialAvatarUrl }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl || null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { toast } = useToast();

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`${userId}`, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(`${userId}`);

      setAvatarUrl(data.publicUrl);

      toast({
        title: "تم تحديث الصورة الشخصية",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "خطأ في رفع الصورة",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-24 h-24 border-4 border-[#4CD6B4]/20">
        <AvatarImage src={avatarUrl || undefined} />
        <AvatarFallback className="bg-[#4CD6B4]/10 text-[#4CD6B4] text-xl">
          {fullName?.[0]?.toUpperCase() || userEmail?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center gap-2">
        <label
          htmlFor="avatar-upload"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#4CD6B4]/10 hover:bg-[#4CD6B4]/20 transition-colors cursor-pointer text-[#4CD6B4]"
        >
          {isUploadingAvatar ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          تغيير الصورة الشخصية
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
          disabled={isUploadingAvatar}
        />
      </div>
    </div>
  );
}