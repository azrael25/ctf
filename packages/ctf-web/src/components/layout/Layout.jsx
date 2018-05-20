import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Sidebar from '../sidebar/Sidebar.jsx';
import s from './layout.css';

class Layout extends PureComponent {
    static propTypes = {
        sidebar: pt.bool
    };

    static defaultProps = {
        sidebar: true
    };

    render() {
        let { children, sidebar } = this.props;

        return <div className={s.layout}>
            {sidebar && <div className={s.sidebar}>
                <Sidebar />
            </div>}

            <div className={s.content}>
                {children}
            </div>
        </div>;
    }
}

export default Layout;
