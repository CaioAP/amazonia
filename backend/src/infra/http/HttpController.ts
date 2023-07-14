import Usecase from '../../application/usecase/Usecase';
import HttpServer from './HttpServer';

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer,
    readonly findFastestPath: Usecase,
    readonly getLastPaths: Usecase,
    readonly getOnePath: Usecase
  ) {
    httpServer.on(
      'get',
      '/deliveries',
      async function (params: any, body: any) {
        return await getLastPaths.execute();
      }
    );
    httpServer.on(
      'get',
      '/deliveries/:id',
      async function (params: any, body: any) {
        return await getOnePath.execute(params);
      }
    );
    httpServer.on(
      'post',
      '/deliveries',
      async function (params: any, body: any) {
        return await findFastestPath.execute(body);
      }
    );
  }
}
