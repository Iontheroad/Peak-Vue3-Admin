/**
 * @param { number } id Unique value
 * @param { string } hashId href Unique value
 * @param { string } title show current title
 * @param { string } routeName page find data
 */

interface GlobalSidebar {
  mainTitle: string;
  mainSidebar: Array<Sidebar>;
}

interface Sidebar {
  id: number;
  hashId: string | number;
  title: string;
  routeName: string;
  children: Array<SidebarItem>;
}

interface SidebarItem {
  id: number;
  parentId: number;
  hashId: string | number;
  title: string;
}

export type { GlobalSidebar, Sidebar, SidebarItem };
