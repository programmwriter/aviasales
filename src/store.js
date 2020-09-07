import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducer from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;
