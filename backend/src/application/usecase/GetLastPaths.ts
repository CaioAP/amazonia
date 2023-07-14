import Delivery from '../../domain/entity/Delivery';
import DeliveryRepository from '../repository/DeliveryRepository';
import Usecase from './Usecase';

export default class GetLastPaths implements Usecase {
  constructor(readonly deliveryRepository: DeliveryRepository) {}

  async execute(): Promise<Delivery[]> {
    return await this.deliveryRepository.getAll();
  }
}
