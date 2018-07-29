import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import Routes from "./routers/routers";
import { Provider } from "react-redux";
import { reducer } from "./reducers/redux";
import { rootSaga } from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(<Provider store={store}><Routes/></Provider>,document.getElementById('root'));
registerServiceWorker();



