import React from 'react';
import { Story, Meta } from '@storybook/react';

import Todo, { Props } from './Todo';

export default {
  title: 'Todo',
  component: Todo,
} as Meta;

const Template: Story<Props> = (args) => <Todo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  completed: 1,
  value: 'foo',
};
