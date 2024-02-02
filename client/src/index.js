import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import myReducer from './context';
import { createStore } from 'redux';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

const myStore = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);