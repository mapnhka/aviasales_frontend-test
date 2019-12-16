import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import logo from '../../logo.svg';

// routes config
import routes from '../../routes';

class DefaultLayout extends Component {
    loading = () => <div>Loading...</div>;

    render() {
        return <div className="app">
            <header>
                <img src={logo} className="app__logo" alt="logo"/>
            </header>
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
                                    <div className="app-body">
                                        {route.sidebar
                                            ? <aside className="sidebar">
                                                <route.sidebar {...props} />
                                            </aside>
                                            : null}
                                        <main className="main">
                                            <route.component {...props} />
                                        </main>
                                    </div>
                                )}/>
                        } else {
                            return null;
                        }
                    })}
                </Switch>
            </Suspense>
        </div>;
    }
}


export default DefaultLayout;