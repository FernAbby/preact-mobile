import { h } from 'preact';
import 'babel-polyfill';
import { Provider } from 'preact-redux';
import Store from '../redux/index';
import Cart from './Cart/index.jsx';
import './app.module.less';
/* import { Router } from 'preact-router'; */


export default function App() {
  return (
    <Provider store={Store}>
      <Cart />
    </Provider>
  );
}
