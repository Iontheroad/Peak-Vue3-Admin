/**
 * cookie
 */

import Cookies from "js-cookie";

const TokenKey = "peak-vue3-admin-token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  let seconds = 10; // 10秒过期
  // let expires = new Date(+new Date() * 1 + seconds * 1000);
  return Cookies.set(TokenKey, token, {
    expires: 7,
  });
}
export function removeToken() {
  return Cookies.remove(TokenKey);
}
