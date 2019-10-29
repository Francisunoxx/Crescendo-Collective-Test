import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import rootReducer from './ReducerIndex';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createBrowserHistory()

const middleware = [thunk];

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer(history),
        initialState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                ...middleware
            )
        )
    )

    return store
}