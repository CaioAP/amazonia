import DeliveryRepository from '../../application/repository/DeliveryRepository';
import Delivery from '../../domain/entity/Delivery';
import Step from '../../domain/entity/Step';
import Connection from '../database/Connection';

export default class DeliveryRepositoryDatabase implements DeliveryRepository {
  constructor(readonly connection: Connection) {}

  async getAll(): Promise<Delivery[]> {
    const deliveries = await this.connection.query(
      `
        SELECT * 
        FROM amazonia."delivery"
        ORDER BY id DESC
        LIMIT 10
      `,
      []
    );
    return deliveries.map(
      (delivery: Delivery) =>
        new Delivery(delivery.id, delivery.start, delivery.pickup, delivery.end)
    );
  }

  async getOne(id: string): Promise<Delivery> {
    const [delivery] = await this.connection.query(
      `
        SELECT * 
        FROM amazonia."delivery"
        WHERE id = $1
      `,
      [id]
    );
    return new Delivery(
      delivery.id,
      delivery.start,
      delivery.pickup,
      delivery.end
    );
  }

  async create(data: Delivery): Promise<Delivery> {
    const [delivery] = await this.connection.query(
      `
        INSERT INTO amazonia."delivery" (id, "start", pickup, "end", distance) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
      `,
      [data.id, data.start, data.pickup, data.end, data.distance]
    );
    const steps: Step[] = [];
    for (const step of data.steps) {
      const [stepData] = await this.connection.query(
        `
          INSERT INTO amazonia.step (id, "start", "end", delivery_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `,
        [step.id, step.start, step.end, delivery.id]
      );
      steps.push(
        new Step(
          stepData.id,
          stepData.start,
          stepData.end,
          stepData.delivery_id
        )
      );
    }
    return new Delivery(
      delivery.id,
      delivery.start,
      delivery.pickup,
      delivery.end,
      steps
    );
  }
}
