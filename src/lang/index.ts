/**
 *
 */

// 自定义国际化配置
import { createI18n } from "vue-i18n";
import { localStorage } from "@/utils/localStorage";

// 本地语言包
import enLocale from "./en";
import zhCnLocale from "./zh-cn";

// 页面的对应单词
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
 *
 * @returns zh-cn|en ...
 */
export const getLanguage = () => {
  // 本地缓存获取
  let language = localStorage.get("language");
  if (language) {
    return language;
  }
  // 浏览器使用语言
  language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  // 是否有浏览器使用的语言,有就跟随浏览器的语言
  if (locales.includes(language)) {
    return language;
  }
  // for (const locale of locales) {
  //   if (language.indexOf(locale) > -1) {
  //     return locale;
  //   }
  // }
  // 默认中文
  return "zh-cn";
};

const i18n = createI18n({
  locale: getLanguage(),
  messages: messages,
});

export default i18n;
