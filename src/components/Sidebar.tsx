import { SidebarLogo } from "./sidebar/SidebarLogo";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarProfile } from "./sidebar/SidebarProfile";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#222] border-l border-gray-800 p-4 flex flex-col">
      <SidebarLogo />
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}