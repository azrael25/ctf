import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import Form from '../src/components/ui/form/Form.jsx';
import FormFieldText from '../src/components/ui/form/FormFieldText.jsx';
import FormFieldActions from '../src/components/ui/form/FormFieldActions.jsx';

const formValues = decorateAction([args => Object.keys(args[0]).map(name => `${name}=${args[0][name]}`)]);

storiesOf('Form', module)
    .add('login', () => <Form
        onSubmit={formValues('login submit')}
    >
        <FormFieldText
            name='email'
            placeholder='Email'
            required
            email
        />

        <FormFieldText
            name='password'
            type='password'
            placeholder='Password'
            required
            passwordComplexity
            minLength={8}
        />

        <FormFieldActions />
    </Form>)
    .add('basic validators', () => <Form
        onSubmit={formValues('basic validators submit')}
    >
        <FormFieldText
            name='required'
            placeholder='Required'
            required
        />

        <FormFieldText
            name='min'
            placeholder='Min length 5 chars'
            minLength={5}
        />

        <FormFieldText
            name='max'
            placeholder='Max length 8 chars'
            maxLength={8}
        />

        <FormFieldText
            name='password'
            type='password'
            placeholder='Password complexity'
            passwordComplexity
        />

        <FormFieldText
            name='confirm'
            type='password'
            placeholder='Password confirm'
            passwordMatch
        />

        <FormFieldText
            name='email'
            placeholder='Email'
            email
        />

        <FormFieldActions />
    </Form>)
    .add('with labels and hints', () => <Form
        onSubmit={formValues('with labels and hints submit')}
    >
        <FormFieldText
            name='name'
            label='First and last name'
            hint='How other people will see your name'
            required
        />

        <FormFieldText
            name='age'
            label='Age'
            hint='It will help to find friends by interests more precisely'
            required
        />

        <FormFieldActions />
    </Form>);
