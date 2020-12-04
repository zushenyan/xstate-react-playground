import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Todos from './Todos';

describe('todos-add', () => {
  test('events', async () => {
    const onClickAdd = jest.fn();

    render(<Todos onClickAdd={onClickAdd} disableAddButton={false} />);

    const input = screen.getByLabelText('todos-add');
    fireEvent.click(input);
    expect(onClickAdd).toHaveBeenCalled();
  });

  test('disabled === false', async () => {
    render(<Todos onClickAdd={jest.fn()} disableAddButton={false} />);
    expect(screen.getByLabelText('todos-add')).not.toBeDisabled();
  });

  test('disabled === true', async () => {
    render(<Todos onClickAdd={jest.fn()} disableAddButton={true} />);
    expect(screen.getByLabelText('todos-add')).toBeDisabled();
  });
});

describe('todos-status', () => {
  test('text', async () => {
    const status = 'status';

    render(
      <Todos onClickAdd={jest.fn()} disableAddButton={false} status={status} />
    );
    expect(screen.getByLabelText('todos-status')).toHaveTextContent(status);
  });
});
