import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { fetchTickets } from "./actions";

import reducer from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;
// store.dispatch(fetchSearchId()).then(() => console.log('store.getState()'))
// store.dispatch(fetchTickets()).then(() => console.log(store.getState()))
store.dispatch(fetchTickets());
