export default interface Graph {
  [node: string]: { [neighbor: string]: number };
}
