import React, { Fragment, PureComponent } from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import { field } from './utils';
import Input from '../input/Input.jsx';
import s from './form.css';

@field
class FormFieldText extends PureComponent {
    static propTypes = {
        name: pt.string,
        type: pt.string,
        label: pt.string,
        hint: pt.string,
        value: pt.string,
        placeholder: pt.string,
        error: pt.string,
        valid: pt.bool,
        update: pt.func
    };

    handleChange = value => this.props.update(value, { silent: true });

    handleBlur = () => this.props.update(this.props.value);

    render() {
        let { name, type, label, hint, placeholder, value, valid, error } = this.props;

        return <Fragment>
            {label && <label
                className={s.fieldLabel}
                htmlFor={name}
            >
                {label}
            </label>}

            <Input
                type={type}
                value={value}
                error={!valid}
                placeholder={placeholder}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />

            {error && <div className={classNames(s.fieldHint, s.fieldHintError)}>
                {error}
            </div>}

            {hint && !error && <div className={s.fieldHint}>
                {hint}
            </div>}
        </Fragment>;
    }
}

export default FormFieldText;
