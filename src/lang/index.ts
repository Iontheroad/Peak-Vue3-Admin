/**
 * i18n配置
 */

import { createI18n } from "vue-i18n";
import { localStorage } from "@/utils/localStorage";

// 自定义本地语言
import enLocale from "./en";
import zhCnLocale from "./zh-cn";
const messages = {
  "zh-cn": {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
};

/**
 * 获取当前系统使用语言字符串
 * @returns zh-cn|en ...
 */
export const getLanguage = () => {
  // 获取本地缓存的语言
  let language = localStorage.get("language");
  if (language) {
    return language;
  }
  // 浏览器使用语言
  language = navigator.language.toLowerCase();

  const locales = Object.keys(messages);
  // 查看语言包是否包含浏览器使用的语言,有就跟随浏览器的语言
  if (locales.includes(language)) {
    return language;
  }
  // 没有就默认中文
  return "zh-cn";
};

const i18n = createI18n({
  // legacy: false, // 如果要支持 compositionAPI，此项必须设置为 false
  locale: getLanguage(),
  // globalInjection: true, // 全局注册$t方法
  messages: messages,
});

/**
 * @description 判断是否存在key的配置，并且翻译key对应的值
 * $t 是 i18n 提供的根据 key 从语言包翻译对应的 value 方法
 *    使用方式：<h3 class="title">{{ $t("login.title") }}</h3>
 * i18n 工具类，主要使用 i18n 的 te (判断语言包是否存在key) 和 t (翻译) 两个方法
 * @param prefix : 前缀
 * @param title：翻译的key
 * @returns
 */
export function generateTitle(title: string) {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te(title);
  if (hasKey) {
    const translatedTitle = i18n.global.t(title);
    return translatedTitle;
  }
  //
  return title.split(".")[1];
}

export default i18n;
