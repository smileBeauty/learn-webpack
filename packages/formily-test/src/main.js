import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Demo from './pages/demo';
import Demo2 from './pages/demo2';

moment.locale('zh-cn');

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={<div>loading</div>}>
                    <ConfigProvider locale={zhCN}>
                        <Switch>
                            <Redirect exact from="/" to="/demo" />
                            <Route exact path="/demo" component={Demo} />
                            <Route exact path="/demo2" component={Demo2} />
                        </Switch>
                    </ConfigProvider>
                </React.Suspense>
            </Router>
        );
    }
}

ReactDom.render(<App />, document.querySelector('#root'));
