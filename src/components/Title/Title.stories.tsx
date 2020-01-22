import React, { ReactElement } from 'react';
import Title from './Title';

export default {
  component: Title,
  title: 'Title',
};

export const InitialProps = (): ReactElement => <Title>Hello World</Title>;
export const WithText = (): ReactElement => (
  <Title textColor="blue">Hello World</Title>
);
