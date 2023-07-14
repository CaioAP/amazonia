import Delivery from '../../domain/entity/Delivery';

export default interface DeliveryRepository {
  getAll(): Promise<Delivery[]>;
  getOne(id: string): Promise<Delivery>;
  create(data: Delivery): Promise<Delivery>;
}
