import React from 'react';
import { log } from '../../utils';

class Dogs extends React.Component {
    componentDidMount() {
        log('cats moutend');
    }
    render() {
        return (
            <div className="cats">
                cats
            </div>
        );
    }
}

Dogs.propTypes = {};

Dogs.defaultProps = {};

export default Dogs;