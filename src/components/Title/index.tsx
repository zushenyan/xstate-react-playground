import styled from 'styled-components';

interface ITitleProps {
  textColor?: string
}

export default styled.h1`
  color: ${({ textColor = 'red' }: ITitleProps) => textColor}
`;