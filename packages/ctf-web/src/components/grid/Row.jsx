import React, { PureComponent } from 'react';
import s from './grid.css';

class Row extends PureComponent {
    render() {
        return <div className={s.gridRow}>
            {this.props.children}
        </div>;
    }
}

export default Row;
