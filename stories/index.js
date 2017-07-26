import React from 'react';

import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import ListFiltered from './ListFiltered';

const data = [
  { label: 'Car' },
  { label: 'Plane' },
  { label: 'Truck' },
];

storiesOf('Simple', module).add('to Filtered', () => (
  <ListFiltered>
    {data}
  </ListFiltered>
));
