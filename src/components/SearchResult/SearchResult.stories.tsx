import React from 'react';
import { Story, Meta } from '@storybook/react';

import SearchResult, { Props } from './SearchResult';

export default {
  title: 'SearchResult',
  component: SearchResult,
} as Meta;

const Template: Story<Props> = (args) => <SearchResult {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  children: new Array(20).fill(1).map((_, i) => <div key={i}>foo</div>),
};
