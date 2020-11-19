import React from 'react'

export interface Props {
  onClick: () => void;
  bgColor: string;
}

const Button: React.FC<Props> = ({ onClick, bgColor }: Props) => {
  return (
    <button onClick={onClick}>aaa</button>
  )
}

export default Button;
