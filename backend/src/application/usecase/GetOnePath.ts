import Delivery from '../../domain/entity/Delivery';
import DeliveryRepository from '../repository/DeliveryRepository';
import Usecase from './Usecase';

interface Input {
  id: string;
}

export default class GetOnePath implements Usecase {
  constructor(readonly deliveryRepository: DeliveryRepository) {}

  async execute(input: Input): Promise<Delivery> {
    return await this.deliveryRepository.getOne(input.id);
  }
}
