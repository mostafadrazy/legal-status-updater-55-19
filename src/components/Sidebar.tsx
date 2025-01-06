import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarProfile } from "./sidebar/SidebarProfile";

export function Sidebar() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-64 glass-card border-r border-white/10 p-4 flex flex-col shadow-xl">
      <SidebarLogo />
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}