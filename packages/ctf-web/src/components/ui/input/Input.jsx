import React, { PureComponent } from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import s from './input.css';

class Input extends PureComponent {
    static propTypes = {
        type: pt.string,
        name: pt.string,
        value: pt.string,
        placeholder: pt.string,
        readonly: pt.bool,
        error: pt.bool,
        disabled: pt.bool,
        onChange: pt.func,
        onFocus: pt.func,
        onBlur: pt.func
    };

    static defaultProps = {
        type: 'text',
        value: '',
        disabled: false,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {}
    };

    state = {
        value: ''
    };

    static getDerivedStateFromProps(nextProps) {
        return {
            value: nextProps.value
        };
    }

    handleChange = event => {
        let value = event.target.value;

        this.setState({ value });
        this.props.onChange(value);
    };

    handleFocus = () => this.props.onFocus();

    handleBlur = () => this.props.onBlur();

    render() {
        let { name, type, placeholder, readonly, error, disabled } = this.props,
            { value } = this.state;

        return <input
            className={classNames(s.input, {
                [s.inputError]: error,
                [s.inputPassword]: type === 'password'
            })}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            autoComplete='off'
            autoCapitalize='off'
            autoCorrect='off'
            spellCheck='false'
            tabIndex={0}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
        />;
    }
}

export default Input;
