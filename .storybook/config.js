import requireContext from 'require-context.macro';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

// automatically import all files ending in *.stories.js
const req = requireContext('../src', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addDecorator(withA11y);
addDecorator(withKnobs);