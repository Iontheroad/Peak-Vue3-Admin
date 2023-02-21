import { GlobalSidebar, Sidebar } from "../Sidebar";

namespace InfoSidebar {
  export type InfoSidebarParams = {
    body: string;
    type: string;
    url: string;
  };
}

const dataSource: Array<GlobalSidebar> = [
  {
    mainTitle: "JavaScript基础问题梳理",
    mainSidebar: [
      {
        id: 0,
        hashId: "This",
        title: "this指向",
        routeName: "JsBasic",
        children: [
          {
            id: 1,
            parentId: 0,
            hashId: "GlobalFunction",
            title: "全局函数",
          },
          {
            id: 2,
            parentId: 0,
            hashId: "ObjectMethod",
            title: "对象方法",
          },
          {
            id: 3,
            parentId: 0,
            hashId: "Constructor",
            title: "构造函数",
          },
          {
            id: 4,
            parentId: 0,
            hashId: "SetTimeout",
            title: "定时器、回调函数",
          },
          {
            id: 5,
            parentId: 0,
            hashId: "EventFunction",
            title: "事件函数",
          },
          {
            id: 6,
            parentId: 0,
            hashId: "ArrowFunction",
            title: "箭头函数",
          },
          {
            id: 7,
            parentId: 0,
            hashId: "CallApplyBind",
            title: "call、apply、bind",
          },
        ],
      },
      {
        id: 2,
        hashId: "DeepClone",
        title: "深拷贝和浅拷贝",
        routeName: "JsBasic",
        children: [],
      },
    ],
  },
];

export default {
  name: "jsBasicInfo",
  jsBasicInfo(params: InfoSidebar.InfoSidebarParams) {
    const param = JSON.parse(params.body);
    console.log(param, params);

    if (!param) throw new Error("Params can not empty!");
    const data = dataSource.find((t: GlobalSidebar) => {
      return t.mainSidebar.filter((x: Sidebar) => {
        return x.routeName === param.routeName;
      });
    });
    return {
      data: dataSource[0].mainSidebar[0],
      success: true,
      code: "00000",
      msg: "刚嘎嘎",
    };
  },
};
