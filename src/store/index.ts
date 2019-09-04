import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { filesReducer } from './files/reducer';
import { FilesActionTypes } from './files/types';

export const rootReducer = combineReducers({
    files: filesReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppActions = FilesActionTypes;

const storeEnhancers = [applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)];
var devtoolEnhancer =  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();
if(devtoolEnhancer) {
    storeEnhancers.push(devtoolEnhancer);
}

export const store = createStore(rootReducer,
    compose(...storeEnhancers));