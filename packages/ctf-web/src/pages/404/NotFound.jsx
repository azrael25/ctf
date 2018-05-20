import React from 'react';
import Layout from '../../components/layout/Layout.jsx';
import s from './not-found.css';

const NotFound = () => <Layout sidebar={false}>
    <div className={s.content}>
        <div className={s.code}>
            404
        </div>
        Page Not Found
    </div>
</Layout>;

export default NotFound;
