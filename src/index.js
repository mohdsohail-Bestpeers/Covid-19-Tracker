import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import Reducer from "./reducers/Reducer"


const store = createStore(Reducer, applyMiddleware(thunk))

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);


