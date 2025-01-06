import { Settings as SettingsIcon } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <SettingsIcon className="w-8 h-8 text-[#4CD6B4]" />
      <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
    </div>
  );
}