import React from 'react';

const consumer = Consumer => Target => props => <Consumer>
    {context => <Target
        {...context}
        {...props}
    />}
</Consumer>;

export default consumer;
