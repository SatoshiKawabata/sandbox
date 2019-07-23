import React from 'react';
import { storiesOf } from '@storybook/react';
import Hoge from "./Hoge";

storiesOf('Welcome', module).add('to Storybook', () => <Hoge siteTitle={"Storybook"} />);
