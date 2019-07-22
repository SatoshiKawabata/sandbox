
---
to: src/components/<%= atomicDirectory %>/<%= componentName %>.stories.tsx
---
import React from 'react';
import { storiesOf } from '@storybook/react';
import <%= componentName %> from "./<%= componentName %>";

storiesOf('Welcome', module).add('to Storybook', () => <<%= componentName %> siteTitle={"Storybook"} />);
