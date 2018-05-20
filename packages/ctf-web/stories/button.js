import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/ui/button/Button.jsx';

storiesOf('Button', module)
    .add('primary', () => <Button onClick={action('click primary')}>Save</Button>)
    .add('secondary', () => <Button secondary onClick={action('click secondary')}>Cancel</Button>)
    .add('wide', () => <Button wide onClick={action('click wide')}>Save</Button>)
    .add('disabled', () => <Button disabled onClick={action('click disabled')}>Save</Button>);
