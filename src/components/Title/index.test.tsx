import initStoryshots from '@storybook/addon-storyshots';
import 'jest-styled-components';

initStoryshots({ framework: 'react', storyKindRegex: /^Title$/ });