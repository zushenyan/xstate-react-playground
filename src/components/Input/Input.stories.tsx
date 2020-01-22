import React, { ReactElement } from 'react';
import Input from './Input';

export default {
  component: Input,
  title: 'Input',
};

export const initialProps = (): ReactElement => (
  <Input placeholder="hello world" />
);
