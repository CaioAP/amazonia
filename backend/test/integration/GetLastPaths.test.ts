import DeliveryRepository from '../../src/application/repository/DeliveryRepository';
import DeliveryRepositoryDatabase from '../../src/infra/repository/DeliveryRepositoryDatabase';
import Connection from '../../src/infra/database/Connection';
import PgPromise from '../../src/infra/database/PgPromiseAdapter';
import GetLastPaths from '../../src/application/usecase/GetLastPaths';
import GetOnePath from '../../src/application/usecase/GetOnePath';

let connection: Connection;
let getLastPaths: GetLastPaths;
let getOnePath: GetOnePath;
let deliveryRepository: DeliveryRepository;

let deliveryId: string;

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

beforeAll(function () {
  connection = new PgPromise();
  deliveryRepository = new DeliveryRepositoryDatabase(connection);
  getLastPaths = new GetLastPaths(deliveryRepository);
  getOnePath = new GetOnePath(deliveryRepository);
});

afterAll(async function () {
  await connection.close();
});

test('should not return a delivery', async function () {
  const deliveries = await getLastPaths.execute();
  expect(deliveries).toHaveLength(0);
});

test('should return one delivery', async function () {
  await sleep(300);
  const deliveries = await getLastPaths.execute();
  deliveryId = String(deliveries[0].id);
  expect(deliveries).toHaveLength(1);
});

test('should return one delivery by id', async function () {
  await sleep(300);
  const delivery = await getOnePath.execute({ id: deliveryId });
  expect(delivery).toHaveProperty('id', deliveryId);
});
