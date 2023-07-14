import Delivery from '../entities/Delivery';
import Step from '../entities/Step';
import HttpClient from '../infra/http/HttpClient';
import DeliveryGateway from './DeliveryGateway';

export default class DeliveryGatewayHttp implements DeliveryGateway {
  constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

  async get(): Promise<Delivery[]> {
    const deliveriesData = await this.httpClient.get(
      `${this.baseUrl}/deliveries`
    );
    const deliveries = [];
    for (const deliveryData of deliveriesData) {
      const delivery = new Delivery(
        deliveryData.id,
        deliveryData.start,
        deliveryData.pickup,
        deliveryData.end
      );
      for (const step of deliveryData.steps) {
        delivery.addStep(new Step(step.id, step.start, step.end, delivery.id));
      }
      deliveries.push(delivery);
    }
    return deliveries;
  }

  async getOne(id: string): Promise<Delivery> {
    const deliveryData = await this.httpClient.get(
      `${this.baseUrl}/deliveries/${id}`
    );
    const delivery = new Delivery(
      deliveryData.id,
      deliveryData.start,
      deliveryData.pickup,
      deliveryData.end
    );
    for (const step of deliveryData.steps) {
      delivery.addStep(new Step(step.id, step.start, step.end, delivery.id));
    }
    return delivery;
  }

  async create(data: Delivery): Promise<Delivery> {
    const deliveryData = await this.httpClient.post(
      `${this.baseUrl}/deliveries`,
      data
    );
    const delivery = new Delivery(
      deliveryData.id,
      deliveryData.start,
      deliveryData.pickup,
      deliveryData.end
    );
    for (const step of deliveryData.steps) {
      delivery.addStep(new Step(step.id, step.start, step.end, delivery.id));
    }
    return delivery;
  }
}
