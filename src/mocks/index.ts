// import qs from "qs";
import Mock from "mockjs";
// import jsBasicInfo from "./json/index"; // 引入数据
import sidebar_mock from "./json/sidebar_data.json";
// const BASE_URL = process.env.VUE_APP_BASE_API;
// const BASE_URL = import.meta.env.VITE_APP_BASE_API; // 公共前缀
// const mocks = [jsBasicInfo]; // 模拟数据,添加到一起

// if (import.meta.env.MODE == "development") {
//   for (let i of mocks) {
//     console.log(i);
//     // if ("get") {
//     //   let obj = i.jsBasicInfo();
//     // }
//     Mock.mock(BASE_URL + "/" + i.name, "post", i.jsBasicInfo);
//     // Mock.mock(/\/dev-api\/jsBasicInfo/, "get", i.jsBasicInfo);
//   }
// }

// namespace Sidebar_Data {
//   export type InfoSidebarParams = {
//     body: string;
//     type: string;
//     url: string;
//   };
// }

/** mock路由 菜单数据 */
Mock.mock(/\/dev-api\/mock\/sidebar/, (params) => {
  console.log(params);

  // console.log(params.body); 拿body 传参
  // console.log(qs.parse(params.url.split("?")[1])); 拿get的传参
  return {
    data: sidebar_mock,
    success: true,
    code: "00000",
    msg: "mock数据",
  };
});

export default Mock;
