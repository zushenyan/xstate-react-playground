import React from 'react';

export type Props = {
  onClickAdd: (event: React.MouseEvent) => void;
  disableAddButton: boolean;
  status?: React.ReactNode;
  children?: React.ReactNode;
};

const Todos: React.FC<Props> = ({
  onClickAdd,
  disableAddButton,
  status,
  children,
}: Props) => {
  return (
    <div className="border-box space-y-2">
      <div className="border-box flex items-center space-x-2">
        <button
          className="box-border h-8 w-8 rounded border-2 hover:bg-gray-100"
          onClick={onClickAdd}
          disabled={disableAddButton}
          aria-label="todos-add"
        >
          +
        </button>
        <div aria-label="todos-status">{status}</div>
      </div>
      <div className="border-box space-y-2">{children}</div>
    </div>
  );
};

export default Todos;
