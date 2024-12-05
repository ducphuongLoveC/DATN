import subRouterProp from '@/interfaces/sub';
import RouteProp from '@/interfaces/route';

const subDomainRouter = (datas: subRouterProp[], mainRoutes: RouteProp[]): RouteProp[] => {
  const stringSubs = window.location.hostname.split('.');

  // Nếu không có miền phụ, trả về mainRoutes
  if (stringSubs.length < 2) {
    return mainRoutes;
  }

  const foundSub = datas.find((d) => d.sub === stringSubs[0]);
  if (foundSub) {
    if (foundSub.isAuthentication && foundSub.handleAuthentication && foundSub.handleAuthentication()) {
      return foundSub.routes;
    }
    if (!foundSub.isAuthentication) return foundSub.routes;
  }

  // Trả về mảng rỗng nếu không tìm thấy miền phụ
  return [];
};

export default subDomainRouter;
