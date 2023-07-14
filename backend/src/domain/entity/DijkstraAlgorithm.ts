import Algorithm, { Output } from './Algorithm';
import Graph from './Graph';

export default class DijkstraAlgorithm implements Algorithm {
  constructor(readonly graph: Graph) {}

  findPath(start: string, end: string): Output {
    const distances: { [node: string]: number } = {};
    const previous: { [node: string]: string | null } = {};
    const visited: { [node: string]: boolean } = {};

    // Initialize distances with infinity except for the start node
    for (const node in this.graph) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
    }

    while (true) {
      let closestNode: string | null = null;
      let closestDistance = Infinity;

      // Find the unvisited node with the smallest distance
      for (const node in this.graph) {
        if (!visited[node] && distances[node] < closestDistance) {
          closestNode = node;
          closestDistance = distances[node];
        }
      }

      if (closestNode === null || closestNode === end) {
        break; // No reachable nodes left or destination reached
      }

      visited[closestNode] = true;

      // Update distances of neighboring nodes
      for (const neighbor in this.graph[closestNode]) {
        const distance = this.graph[closestNode][neighbor];
        const totalDistance = closestDistance + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = closestNode;
        }
      }
    }

    // Build path from start to end
    const path: string[] = [];
    let current: string | null = end;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    return { distance: Math.floor(distances[end] * 100) / 100, path };
  }
}
