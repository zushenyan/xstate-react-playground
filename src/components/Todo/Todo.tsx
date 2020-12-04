import React from 'react';

export interface Props {
  completed: 1 | 0;
  onChangeCompleted: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onFocusInput: (event: React.FocusEvent) => void;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurInput: (event: React.FocusEvent) => void;
  onDelete: (event: React.MouseEvent) => void;
}

const Todo: React.FC<Props> = ({
  completed,
  onChangeCompleted,
  value,
  onFocusInput,
  onChangeInput,
  onBlurInput,
  onDelete,
}: Props) => {
  const textInputClass =
    'box-border px-2 flex-1 rounded hover:bg-gray-100 focus:bg-gray-100 disabled:opacity-50 disabled:bg-transparent' +
    (completed ? ' line-through' : '');

  return (
    <div className="box-border flex space-x-2">
      <input
        className="box-border h-8 w-8"
        type="checkbox"
        value={completed}
        onChange={onChangeCompleted}
        checked={!!completed}
        aria-label="todo-complete"
      />
      <input
        className={textInputClass}
        type="text"
        value={value}
        onFocus={onFocusInput}
        onChange={onChangeInput}
        onBlur={onBlurInput}
        disabled={completed === 1}
        aria-label="todo-value"
      />
      <button
        className="box-border h-8 w-8 rounded border-2 hover:bg-gray-100"
        onClick={onDelete}
        aria-label="todo-delete"
      >
        -
      </button>
    </div>
  );
};

export default Todo;
