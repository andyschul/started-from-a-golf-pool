import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { makeMainRoutes } from './routes';
require('dotenv').config({path: '../.env'});
console.log(process)

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
