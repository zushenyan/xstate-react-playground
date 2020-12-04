import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Todo from './Todo';

describe('todo-value', () => {
  test('events', async () => {
    const value = '123';
    const onFocusInput = jest.fn();
    const onChangeInput = jest.fn();
    const onBlurInput = jest.fn();

    render(
      <Todo
        completed={0}
        value={value}
        onChangeCompleted={jest.fn()}
        onFocusInput={onFocusInput}
        onChangeInput={onChangeInput}
        onBlurInput={onBlurInput}
        onDelete={jest.fn()}
      />
    );

    const input = screen.getByLabelText('todo-value');

    fireEvent.focus(input);
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'foo' } });

    expect(onFocusInput).toHaveBeenCalled();
    expect(onBlurInput).toHaveBeenCalled();
    expect(onChangeInput).toHaveBeenCalled();
    expect(input).toHaveValue(value);
  });
});

describe('todo-complete', () => {
  test('events', async () => {
    const completed = 1;
    const onChangeCompleted = jest.fn();

    render(
      <Todo
        completed={completed}
        value="123"
        onChangeCompleted={onChangeCompleted}
        onFocusInput={jest.fn()}
        onChangeInput={jest.fn()}
        onBlurInput={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    const input = screen.getByLabelText('todo-complete');

    fireEvent.click(input);

    expect(onChangeCompleted).toHaveBeenCalled();
  });

  test('completed', () => {
    render(
      <Todo
        completed={1}
        value="123"
        onChangeCompleted={jest.fn()}
        onFocusInput={jest.fn()}
        onChangeInput={jest.fn()}
        onBlurInput={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByLabelText('todo-complete')).toBeChecked();
  });

  test('incompleted', () => {
    render(
      <Todo
        completed={0}
        value="123"
        onChangeCompleted={jest.fn()}
        onFocusInput={jest.fn()}
        onChangeInput={jest.fn()}
        onBlurInput={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByLabelText('todo-complete')).not.toBeChecked();
  });
});

describe('todo-delete', () => {
  test('events', async () => {
    const onDelete = jest.fn();

    render(
      <Todo
        completed={0}
        value="123"
        onChangeCompleted={jest.fn()}
        onFocusInput={jest.fn()}
        onChangeInput={jest.fn()}
        onBlurInput={jest.fn()}
        onDelete={onDelete}
      />
    );

    const input = screen.getByLabelText('todo-delete');
    fireEvent.click(input);
    expect(onDelete).toHaveBeenCalled();
  });
});
