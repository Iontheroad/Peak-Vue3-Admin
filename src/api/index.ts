/**
 * 不属于某个页面的接口
 */
import request from "@/utils/request";

/**
 * 获取路由菜单集合
 * @param params
 * @returns
 */
export function reqGetListRoutesApi() {
  // return request.get("sidebar", { params: { aa: "w" } });
  // params: { routeName: "get" },
  return request({
    url: "/mock/sidebar",
    method: "get",
    // params,
  });
}
