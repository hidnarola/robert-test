import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const configureStore = () => {
    if (process.env.NODE_ENV === 'production') {
        const store = createStore(
            rootReducer,
            compose(applyMiddleware(thunk))
        )
        return store;
    } else {
        const store = createStore(
            rootReducer,
            compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): compose)
            //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        return store;
    }
}

export default configureStore;