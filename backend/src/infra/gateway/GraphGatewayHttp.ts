import GraphGateway from '../../application/gateway/GraphGateway';
import Graph from '../../domain/entity/Graph';
import HttpClient from '../http/HttpClient';

export default class GraphGatewayHttp implements GraphGateway {
  constructor(readonly httpClient: HttpClient) {}

  async get(): Promise<Graph> {
    const response = await this.httpClient.get(
      'https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f'
    );
    return response;
  }
}
