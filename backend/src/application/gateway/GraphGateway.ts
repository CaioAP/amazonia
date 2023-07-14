import Graph from '../../domain/entity/Graph';

export default interface GraphGateway {
  get(): Promise<Graph>;
}
