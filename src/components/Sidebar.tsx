import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarProfile } from "./sidebar/SidebarProfile";

export function Sidebar() {
  return (
    <aside className="w-64 glass-card border-l border-white/10 p-4 flex flex-col shadow-xl">
      <SidebarLogo />
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}