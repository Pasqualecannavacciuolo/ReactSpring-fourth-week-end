import './App.css';
import './components/OrdersRepository.css'
import './components/ProductRepository.css'
import { OrderRepository } from './components/OrdersRepository';
import { ProductRepository } from './components/ProductRepository';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ShipmentsRepository } from './components/ShipmentsRepository';

function App() {
  return (
    <div className='App'>
    <Router>
      <div>
        <nav className='toolbar'>
          <ul>
            <li>
              <Link className='link' to="/">Products</Link>
            </li>
            <li>
              <Link  className='link' to="/orders">Orders</Link>
            </li>
            <li>
              <Link  className='link' to="/shipments">Shipments</Link>
            </li>
          </ul>
        </nav>


        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/shipments">
            <Shipments />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Products() {
  return (
    <ProductRepository />
  );
}

function Orders() {
  return (
    <OrderRepository />
  );
}

function Shipments() {
  return (
    <ShipmentsRepository />
  );
}

export default App;
