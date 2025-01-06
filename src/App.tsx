import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/tabs/ProfileTab";
import { NotificationsTab } from "@/components/settings/tabs/NotificationsTab";
import { AppearanceTab } from "@/components/settings/tabs/AppearanceTab";
import { SecurityTab } from "@/components/settings/tabs/SecurityTab";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
