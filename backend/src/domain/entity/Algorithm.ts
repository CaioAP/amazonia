import Graph from './Graph';

export interface Output {
  distance: number;
  path: string[];
}

export default interface Algorithm {
  graph: Graph;
  findPath(start: string, end: string): Output;
}
