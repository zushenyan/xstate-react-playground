import React from 'react';
import { Story, Meta } from '@storybook/react';

import Todos, { Props } from './Todos';

export default {
  title: 'Todos',
  component: Todos,
} as Meta;

const Template: Story<Props> = (args) => <Todos {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  disableAddButton: false,
  status: 'loading...',
  children: new Array(10).fill(0).map((_, i) => <div key={i}>foo</div>),
};
