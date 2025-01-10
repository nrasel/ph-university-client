import { TRoute, TUserPaths } from "../types";

export const routeGenerator = (items: TUserPaths[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!, //not null assertion operator
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
