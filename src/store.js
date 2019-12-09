import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/index';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import history from './appHistory';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = applyMiddleware(
    promise,
    thunk,
    routerMiddleware(history)
);

const store = createStore(
    rootReducer,
    composeWithDevTools(middleware),
);

export default store;