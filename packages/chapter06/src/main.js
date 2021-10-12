import React from 'react';
import ReactDom from 'react-dom';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
// import Dashboard from './pages/dashboard/dashboard';
// import Dogs from './pages/dogs/dogs';
// import Cats from './pages/cats/cats';
// import NotFound from './pages/not-found/not-found';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

const Dashboard = React.lazy(() => import(/* webpackChunkName: "dashboard" */'./pages/dashboard/dashboard'));
const Dogs = React.lazy(() => import(/* webpackChunkName: "dogs" */'./pages/dogs/dogs'));
const Cats = React.lazy(() => import(/* webpackChunkName: "cats" */'./pages/cats/cats'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "not-found" */'./pages/not-found/not-found'));

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={<div>loading</div>}>
                    <ConfigProvider locale={zhCN}>
                        <Switch>
                            <Redirect exact from="/" to="/dashboard" />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/dogs" component={Dogs} />
                            <Route exact path="/cats" component={Cats} />
                            <Route path="/*" component={NotFound} />
                        </Switch>
                    </ConfigProvider>
                </React.Suspense>
            </Router>
        );
    }
}
ReactDom.render(<App />, document.querySelector('#root'));
