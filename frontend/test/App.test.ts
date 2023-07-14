import { mount } from '@vue/test-utils';
import AppVue from '../src/App.vue';
import DeliveryGateway from '../src/gateways/DeliveryGateway';
import DeliveryGatewayHttp from '../src/gateways/DeliveryGatewayHttp';
import HttpClient from '../src/infra/http/HttpClient';
import AxiosAdapter from '../src/infra/http/AxiosAdapter';

let httpClient: HttpClient;
let deliveryGateway: DeliveryGateway;

beforeAll(function () {
  httpClient = new AxiosAdapter();
  deliveryGateway = new DeliveryGatewayHttp(
    httpClient,
    'http://localhost:3000'
  );
});

test('should test the app view', function () {
  const wrapper = mount(AppVue, {
    global: {
      provide: {
        deliveryGateway,
      },
    },
  });
  expect(wrapper.get('.board').isVisible()).toBeTruthy();
  expect(wrapper.get('.inputs').isVisible()).toBeTruthy();
  expect(wrapper.get('.history').isVisible()).toBeTruthy();
});
