import { interpret } from 'xstate';
import { machine } from './search';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe('global events', () => {
  test('TYPE', () => {
    const nextState = machine.transition('ready', 'TYPE');
    expect(nextState.matches('startSearching')).toBeTruthy();
  });
  test('SEARCH', () => {
    const nextState = machine.transition('ready', 'SEARCH');
    expect(nextState.matches('searching')).toBeTruthy();
  });
  test('ERROR', () => {
    const nextState = machine.transition('ready', 'ERROR');
    expect(nextState.matches('error')).toBeTruthy();
  });
});

describe('states', () => {
  describe('searching', () => {
    test('success', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { setData: jest.fn() },
          services: { searchAll: () => Promise.resolve() },
        })
      ).start();

      service.send('SEARCH');
      await sleep(10);
      expect(service.state.matches('ready')).toBeTruthy();
    });
    test('fail', async () => {
      const service = interpret(
        machine.withConfig({
          actions: { setData: jest.fn() },
          services: { searchAll: () => Promise.reject() },
        })
      ).start();

      service.send('SEARCH');
      await sleep(10);
      expect(service.state.matches('error')).toBeTruthy();
    });
  });
});
