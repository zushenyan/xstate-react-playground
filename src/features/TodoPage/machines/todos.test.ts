import { interpret } from 'xstate';
import { machine } from './todos';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe('states', () => {
  describe('init', () => {
    test('invoke - success', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { initTodos: jest.fn() },
          services: {
            loadTodos: () => Promise.resolve(),
            saveTodos: () => Promise.resolve(),
          },
        })
      ).start();

      await sleep(100);
      expect(service.state.matches('ready')).toBeTruthy();
    });
    test('invoke - fail', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { initTodos: jest.fn() },
          services: {
            loadTodos: () => Promise.reject(),
            saveTodos: () => Promise.resolve(),
          },
        })
      ).start();

      await sleep(100);
      expect(service.state.matches('error')).toBeTruthy();
    });
  });

  describe('ready', () => {
    test('standby', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { initTodos: jest.fn() },
          services: {
            loadTodos: () => Promise.resolve(),
            saveTodos: jest.fn(),
          },
        })
      ).start();

      await sleep(5500);
      expect(service.state.matches('ready.saving')).toBeTruthy();
    });
    test('saving', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { initTodos: jest.fn() },
          services: {
            loadTodos: () => Promise.resolve(),
            saveTodos: () => Promise.resolve(),
          },
        })
      ).start();

      await sleep(5500);
      expect(service.state.matches('ready.standby')).toBeTruthy();
    });
  });
});
