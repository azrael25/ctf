import React, { PureComponent } from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import s from './button.css';

class Button extends PureComponent {
    static propTypes = {
        type: pt.string,
        secondary: pt.bool,
        disabled: pt.bool,
        wide: pt.bool,
        onClick: pt.func
    };

    static defaultProps = {
        type: 'button',
        secondary: false,
        disabled: false,
        wide: false,
        onClick: () => {}
    };

    handleClick = event => this.props.onClick(event);

    render() {
        let { children, type, secondary, disabled, wide } = this.props;

        return <button
            className={classNames(s.button, {
                [s.buttonSecondary]: secondary,
                [s.buttonWide]: wide
            })}
            type={type}
            disabled={disabled}
            onClick={this.handleClick}
        >
            {children}
        </button>;
    }
}

export default Button;
