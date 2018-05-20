import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { FormProvider } from './utils';

class Form extends PureComponent {
    static propTypes = {
        onSubmit: pt.func
    };

    static defaultProps = {
        onSubmit: () => {}
    };

    state = {
        values: {},
        errors: {},
        submitting: false,
        valid: true
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ submitting: true });
        await this.props.onSubmit(this.state.values);
        this.setState({ submitting: false });
    };

    update = (name, value, valid) => {
        this.setState(state => {
            let errors = { ...state.errors };

            valid ? delete errors[name] : errors[name] = true;

            return {
                values: {
                    ...state.values,
                    [name]: value
                },
                errors,
                valid: Object.keys(errors).length === 0
            };
        });
    };

    render() {
        return <form
            onSubmit={this.handleSubmit}
        >
            <FormProvider
                value={{
                    values: this.state.values,
                    submitting: this.state.submitting,
                    valid: this.state.valid,
                    update: this.update
                }}
            >
                {this.props.children}
            </FormProvider>
        </form>;
    }
}

export default Form;
