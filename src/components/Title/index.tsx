import styled from 'styled-components';

interface TitleProps {
  textColor?: string;
}

export default styled.h1`
  color: ${({ textColor = 'red' }: TitleProps): string => textColor};
`;
