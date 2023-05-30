/**
 * 本地存储 window.localStorage
 * 存储一些 设置项（如默认大小）
 */
export const localStorage = {
  // 获取永久缓存
  get(key: string) {
    let json: any = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  // 设置永久缓存
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  // 移除永久缓存
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  // 移除全部永久缓存
  clear() {
    window.localStorage.clear();
  },
};

/**
 * 侧边栏状态(显示/隐藏)存储本地
 * opened | closed(收起和半收起)
 */
const SidebarStatusKey = "sidebarStatus";
export function getSidebarStatus() {
  return localStorage.get(SidebarStatusKey);
}
export function setSidebarStatus(sidebarStatus: string) {
  localStorage.set(SidebarStatusKey, sidebarStatus);
}

/**
 * 布局大小
 */
const SizeKey = "size";
export function getSize() {
  return localStorage.get(SizeKey);
}
export function setSize(size: string) {
  localStorage.set(SizeKey, size);
}
