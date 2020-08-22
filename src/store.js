import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// import {fetchTickets} from './actions';

import reducer from "./reducers";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
// store.dispatch(fetchSearchId()).then(() => console.log('store.getState()'))
// store.dispatch(fetchTickets()).then(() => console.log(store.getState()))
