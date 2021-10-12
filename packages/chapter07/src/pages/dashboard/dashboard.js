import React from 'react';
import './dashboard.css';
import { Button } from 'antd';
import { log } from '../../utils';

class Dashboard extends React.Component {
    componentDidMount() {
        log('dashboard moutend');
    }
    importClick = () => {
        // import(/* webpackChunkName: "dynamic9*9", webpackPreload: true */'../../dynamic').then(importModule => {
        //     importModule.default();
        // });
        // import(/* webpackChunkName: "dynamic9*9", webpackPrefetch: true */'../../dynamic').then(importModule => {
        //     importModule.default();
        // });
        import(/* webpackChunkName: "dynamic9*9" */'../../dynamic').then(importModule => {
            importModule.default();
        });
    }
    render() {
        return (
            <div className="dashboard">
                <p className="dashboard__p">dashboard</p>
                <Button type="primary" onClick={this.importClick}>import</Button>
            </div>
        );
    }
}

export default Dashboard;