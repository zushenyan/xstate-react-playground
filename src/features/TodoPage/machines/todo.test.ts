import { machine } from './todo';

describe('global events', () => {
  test('DELETE', () => {
    const nextState = machine.transition('ready', 'DELETE');
    expect(nextState.matches('ready')).toBeTruthy();
  });
});

describe('states', () => {
  describe('ready', () => {
    test('CHANGE_COMPLETE', () => {
      const nextState = machine.transition('ready', 'CHANGE_COMPLETE');
      expect(nextState.matches('ready')).toBeTruthy();
    });
    test('EDIT', () => {
      const nextState = machine.transition('ready', 'EDIT');
      expect(nextState.matches('editing')).toBeTruthy();
    });
  });

  describe('editing', () => {
    test('CHANGE', () => {
      const nextState = machine.transition('editing', 'CHANGE');
      expect(nextState.matches('editing')).toBeTruthy();
    });
    test('BLUR - empty', () => {
      const nextState = machine
        .withConfig({ guards: { notEmpty: () => true } })
        .transition('editing', 'BLUR');
      expect(nextState.matches('ready')).toBeTruthy();
    });
    test('BLUR - not empty', () => {
      const nextState = machine
        .withConfig({ guards: { notEmpty: () => false } })
        .transition('editing', 'BLUR');
      expect(nextState.matches('editing')).toBeTruthy();
    });
  });
});
