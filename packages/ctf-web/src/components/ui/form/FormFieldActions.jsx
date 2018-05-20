import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { formConsumer, formContextType } from './utils';
import Button from '../button/Button.jsx';

@formConsumer
class FormFieldActions extends PureComponent {
    static propTypes = {
        submitText: pt.string,
        form: formContextType
    };

    static defaultProps = {
        submitText: 'Save'
    };

    render() {
        let { submitText, form: { valid, submitting } } = this.props;

        return <Button
            type='submit'
            disabled={!valid || submitting}
            wide
        >
            {submitText}
        </Button>;
    }
}

export default FormFieldActions;

