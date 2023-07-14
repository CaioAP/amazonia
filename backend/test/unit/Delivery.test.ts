import Delivery from '../../src/domain/entity/Delivery';

test('should test setting the delivery distance', function () {
  const delivery = new Delivery(undefined, 'A1', 'A2', 'B1');
  delivery.setDistance(44.11);
  expect(delivery.getDistance()).toBe(44.11);
});

test('should test setting the delivery steps', function () {
  const delivery = new Delivery(undefined, 'A1', 'A2', 'B1');
  delivery.setSteps(['A1', 'A2', 'A1', 'B1']);
  expect(delivery.steps).toHaveLength(3);
  expect(delivery.steps.at(0)).toHaveProperty('start', 'A1');
  expect(delivery.steps.at(0)).toHaveProperty('end', 'A2');
  expect(delivery.steps.at(2)).toHaveProperty('start', 'A1');
  expect(delivery.steps.at(2)).toHaveProperty('end', 'B1');
});
