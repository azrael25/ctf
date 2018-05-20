import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../src/components/ui/input/Input.jsx';

storiesOf('Input', module)
    .add('simple', () => <Input value='hello world' />)
    .add('with placeholder', () => <Input placeholder='type something...' />)
    .add('error', () => <Input value='hello world' error />)
    .add('disabled', () => <Input value='hello world' disabled />);
