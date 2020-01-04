import React, { ReactElement } from 'react';
import { storiesOf } from '@storybook/react';
import Input from './index';

storiesOf('Input', module).add(
  'initial props',
  (): ReactElement => <Input placeholder="hello world" />,
);
