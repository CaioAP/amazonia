import { VueWrapper, mount } from '@vue/test-utils';
import BaseBoard from '../src/components/BaseBoard.vue';

let wrapper: VueWrapper;

beforeAll(function () {
  wrapper = mount(BaseBoard, {
    props: {
      selected: [],
    },
  });
});

test('should test if the board height and length are visible', function () {
  expect(wrapper.get('.board-height').isVisible()).toBeTruthy();
  expect(wrapper.get('.board-height').findAll('span').length).toBe(8);
  expect(wrapper.get('.board-length').isVisible()).toBeTruthy();
  expect(wrapper.get('.board-length').findAll('span').length).toBe(8);
})

test('should test if the board is visible', function () {
  expect(wrapper.get('.board').isVisible()).toBeTruthy();
});

test('should test if the board has 8 rows and 64 cells', function () {
  expect(wrapper.findAll('.board-cell').length).toBe(64);
});

test('should test if the cells contain a button and is it callable', function () {
  const cellButton = wrapper.findAll('.board-cell').at(0)?.get('.btn-cell');
  expect(cellButton).toBeTruthy();
  cellButton?.trigger('click');
  const emitted = wrapper.emitted('select');
  expect(emitted).toBeTruthy();
  expect(emitted?.at(0)?.at(0)).toContain('A8');
});
