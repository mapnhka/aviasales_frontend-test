import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

// routes config
import routes from '../../routes';

class DefaultLayout extends Component {
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

    render() {
        return <div className="app">
            <div className="app-body">
                <main className="main">
                    <Suspense fallback={this.loading()}>
                        <Switch>
                            {routes.map((route, idx) => {
                                if (route.component) {
                                    return <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => (
                                            <route.component {...props} />
                                        )}/>
                                } else {
                                    return null;
                                }
                            })}
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </div>;
    }
}


export default DefaultLayout;