import React, { PureComponent } from 'react';
import pt from 'prop-types';
import classNames from 'classnames';
import s from './grid.css';

class Column extends PureComponent {
    static propTypes = {
        size: pt.number,
        offset: pt.number
    };

    render() {
        return <div
            className={classNames(s.gridColumn, {
                [s[`gridColumnSize${this.props.size}`]]: this.props.size,
                [s[`gridColumnOffset${this.props.offset}`]]: this.props.offset
            })}
        >
            {this.props.children}
        </div>;
    }
}

export default Column;
