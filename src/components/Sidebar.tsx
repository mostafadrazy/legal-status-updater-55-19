import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarProfile } from "./sidebar/SidebarProfile";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#222]/90 backdrop-blur-xl border-l border-gray-800/50 p-4 flex flex-col shadow-xl">
      <SidebarLogo />
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}