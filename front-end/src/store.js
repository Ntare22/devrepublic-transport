import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import allReducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(allReducers, composeWithDevTools(applyMiddleware(logger, thunk)))