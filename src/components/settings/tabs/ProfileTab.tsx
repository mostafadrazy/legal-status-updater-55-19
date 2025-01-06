import { Card, CardContent } from "@/components/ui/card";
import { AvatarUpload } from "@/components/settings/AvatarUpload";
import { ProfileForm } from "@/components/settings/ProfileForm";

interface ProfileTabProps {
  userId: string;
  userEmail?: string;
  profileData: any;
  avatarUrl: string | null;
  onUpdateProfile: (data: any) => void;
}

export function ProfileTab({ userId, userEmail, profileData, avatarUrl, onUpdateProfile }: ProfileTabProps) {
  return (
    <Card className="glass-card border-white/10 bg-white/5">
      <CardContent className="p-6 space-y-8">
        <AvatarUpload 
          userId={userId}
          userEmail={userEmail}
          fullName={profileData?.full_name}
          initialAvatarUrl={avatarUrl}
        />
        <ProfileForm 
          userId={userId}
          initialData={profileData}
          onUpdate={onUpdateProfile}
        />
      </CardContent>
    </Card>
  );
}