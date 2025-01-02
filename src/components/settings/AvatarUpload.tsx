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
      // Create a canvas to crop the image
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = URL.createObjectURL(file);
      });

      // Make the canvas square with the smaller dimension
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      // Calculate cropping
      const offsetX = (img.width - size) / 2;
      const offsetY = (img.height - size) / 2;

      // Draw the image centered and cropped
      ctx?.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);

      // Convert canvas to blob
      const croppedBlob = await new Promise<Blob>((resolve) => 
        canvas.toBlob((blob) => resolve(blob!), file.type)
      );

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`${userId}`, croppedBlob, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data } = await supabase.storage
        .from('avatars')
        .getPublicUrl(`${userId}`);

      // Update the avatar_url in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

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
        <AvatarImage src={avatarUrl || undefined} className="object-cover" />
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