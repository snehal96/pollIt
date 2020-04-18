import React from 'react';

import ErrorMessage from '../components/ErrorMessage'
import Polls from '../components/Polls';


const Homepage = props => (
    <div>
        <ErrorMessage />
        <Polls {...props} />
    </div>
)

export default Homepage;