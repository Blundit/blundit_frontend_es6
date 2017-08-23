import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './views/Store'

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
