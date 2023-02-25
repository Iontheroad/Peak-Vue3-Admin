/**
 * 翻译
 */
import i18n from "@/lang/index";
// $t 是 i18n 提供的根据 key 从语言包翻译对应的 value 方法
// <h3 class="title">{{ $t("login.title") }}</h3>
// =======================
// i18n 工具类，主要使用 i18n 的 te (判断语言包是否存在key) 和 t (翻译) 两个方法
export function generateTitle(title: any) {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te("route." + title);
  if (hasKey) {
    const translatedTitle = i18n.global.t("route." + title);
    return translatedTitle;
  }
  return title;
}
