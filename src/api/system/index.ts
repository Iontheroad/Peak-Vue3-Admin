export namespace System {
  export interface Info {
    path: string;
    routeName: string;
  }

  export interface ResponseItem {
    code: number;
    items: Array<Sidebar>;
    success: boolean;
  }

  export interface Sidebar {
    id: number;
    hashId: string | number;
    title: string;
    routeName: string;
    children: Array<SidebarItem>;
  }

  export interface SidebarItem {
    id: number;
    parentId: number;
    hashId: string | number;
    title: string;
  }
}
