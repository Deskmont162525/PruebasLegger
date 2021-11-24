
import {createStore, applyMiddleware, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from  "redux-thunk";

import combineReducers from "../reducer/index";

const composeEnhancer = composeWithDevTools || compose;

const store = createStore(
	combineReducers, 
	composeEnhancer(applyMiddleware(thunk))
);

export default store;