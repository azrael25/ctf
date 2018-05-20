import React, { createContext, PureComponent } from 'react';
import pt from 'prop-types';
import * as baseValidators from './validators';
import s from './form.css';

export const formContextType = pt.shape({
    values: pt.object,
    submitting: pt.bool,
    valid: pt.bool,
    update: pt.func
});

const defaultValue = {
    values: {},
    submitting: false,
    valid: true,
    update: () => {}
};

const FormContext = createContext(defaultValue);

export const FormProvider = FormContext.Provider;

export const formConsumer = Target => props => <FormContext.Consumer>
    {context => <Target
        form={context}
        {...props}
    />}
</FormContext.Consumer>;

const baseValidatorNames = Object.keys(baseValidators);

function validate(value, validators = [], values = {}) {
    let failed = validators.find(({ rule }) => !rule(value, values));

    return {
        valid: !failed,
        error: failed && failed.message || ''
    };
}

export const field = Target => {
    class FormField extends PureComponent {
        static propTypes = {
            name: pt.string.isRequired,
            validators: pt.object,
            form: formContextType
        };

        static defaultProps = {
            validators: {}
        };

        state = {
            validators: [],
            valid: true,
            error: '',
            dirty: false
        };

        static getDerivedStateFromProps(nextProps, prevState) {
            let validators = [],
                res;

            baseValidatorNames.forEach(name => {
                name in nextProps.validators && validators.push(baseValidators[name](nextProps.validators[name]));
                name in nextProps && !(name in nextProps.validators) && validators.push(baseValidators[name](nextProps[name]));
            });

            'custom' in nextProps.validators && validators.push(nextProps.validators.custom);

            if (prevState.prevValidators === nextProps.validators && prevState.prevValue === nextProps.value)
                return null;

            res = validate(nextProps.value, validators, nextProps.form.values);

            nextProps.form.update(nextProps.name, nextProps.value, res.valid);

            return {
                value: nextProps.value,
                validators,
                dirty: false,
                prevValue: nextProps.value,
                prevValidators: nextProps.validators
            };
        }

        update = (value, { silent = false } = {}) => {
            let { valid, error } = validate(value, this.state.validators, this.props.form.values);

            this.setState({
                value,
                valid: !this.state.dirty || silent || valid,
                error: this.state.dirty && !silent && error || '',
                dirty: true
            });

            return this.props.form.update(this.props.name, value, valid);
        };

        render() {
            let { value, valid, error } = this.state;

            return <div className={s.field}>
                <Target
                    {...this.props}
                    value={value}
                    valid={valid}
                    error={error}
                    update={this.update}
                />
            </div>;
        }
    }

    return formConsumer(FormField);
};
