import Delivery from '../../domain/entity/Delivery';
import DijkstraAlgorithm from '../../domain/entity/DijkstraAlgorithm';
import GraphGateway from '../gateway/GraphGateway';
import DeliveryRepository from '../repository/DeliveryRepository';
import Usecase from './Usecase';

interface Input {
  start: string;
  pickup: string;
  destination: string;
}
export default class FindFastestPath implements Usecase {
  constructor(
    readonly graphGateway: GraphGateway,
    readonly deliveryRepository: DeliveryRepository
  ) {}

  async execute(input: Input): Promise<Delivery> {
    const graph = await this.graphGateway.get();
    const pickupAlgorithm = new DijkstraAlgorithm(graph);
    const pickupResult = pickupAlgorithm.findPath(input.start, input.pickup);
    const destinationAlgorithm = new DijkstraAlgorithm(graph);
    const destinationResult = destinationAlgorithm.findPath(
      input.pickup,
      input.destination
    );
    destinationResult.path.shift();
    const totalDistance =
      Math.floor((pickupResult.distance + destinationResult.distance) * 100) /
      100;
    const totalPath = pickupResult.path.concat(destinationResult.path);
    const delivery = new Delivery(
      undefined,
      input.start,
      input.pickup,
      input.destination
    );
    delivery.setDistance(totalDistance);
    delivery.setSteps(totalPath);
    await this.deliveryRepository.create(delivery);
    return delivery;
  }
}
