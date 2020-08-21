import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
// import {fetchTickets} from './actions';

import reducer from "./reducers";
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
/* eslint-enable */
export default store;
// store.dispatch(fetchTickets()).then(() => console.log('store.getState()'))
// store.dispatch(fetchTickets()).then(() => console.log(store.getState()))
