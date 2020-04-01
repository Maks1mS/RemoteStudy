import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

import 'typeface-roboto'

addParameters({
  options: {
    theme: themes.dark,
  },
});