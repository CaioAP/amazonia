import Delivery from '../entities/Delivery';

export default interface DeliveryGateway {
  get(): Promise<Delivery[]>;
  getOne(id: string): Promise<Delivery>;
  create(data: Delivery): Promise<Delivery>;
}
