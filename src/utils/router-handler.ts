import { Menu } from "@/api/modules/login/type";
import { Router } from "@/stores/interface";

/**
 * 使用递归扁平化菜单，方便添加动态路由
 * @param menuList 接口返回权限菜单
 * @returns
 */
export const getFlatRouterList = (menuList: Router.Option[]): Router.Option[] => {
  let newMenuList: Router.Option[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.flatMap(item => [
    item,
    ...(item.children ? getFlatRouterList(item.children) : [])
  ]);
};

/**
 * 递归删除menuType为3的children，用于过滤菜单权限
 */
export const filterPermisMenu = (data: Router.Option[]): Router.Option[] => {
  const temp = data.filter(item => item.meta.type === 1 || item.meta.type === 2);
  return temp.map(item => ({
    ...item,
    children: item.children && filterPermisMenu(item.children)
  }));
};

/**
 * 处理接口返回的权限菜单，转换为路由，提取出权限存储至路由meta的permis中
 * @param list 接口返回的权限菜单
 * @param depth 递归深度，初始为0
 */
export const getTransferRouter = (list: Menu.Response, depth: number = 0) => {
  const arr: Router.Option[] = list.map(item => {
    const { path, id, remark, name, menuType, children } = item;
    return {
      path,
      name: path,
      meta: {
        id,
        icon: Menu.MenuIconEnum[item.name],
        remark,
        isKeepAlive: true,
        permis: depth === 1 ? children?.map(i => i.name) : [],
        title: name,
        type: menuType,
        isFull: false
      },
      children: children ? getTransferRouter(children, depth + 1) : []
    };
  });
  return filterPermisMenu(arr);
};

/**
 * 获取不同路由模式对应的url和params
 */
export const getUrlWithParams = () => {
  const mode = import.meta.env.VITE_ROUTER_MODE;
  const url = {
    hash: decodeURIComponent(location.hash).substring(1),
    history: location.pathname + location.search
  };
  return url[mode];
};
