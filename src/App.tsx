import React, { useReducer, useEffect } from 'react';
import './App.css';
import reducer, { initialState } from './reducer';
import loadReponse from './loadResponse.json';
import { ActionTypes, LoadResponse } from './types';
import { getDisplayItems, getTotalPrice, getDisplayCart } from './selectors/selectors';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ActionTypes.successfullyLoaded, response: loadReponse as LoadResponse})
  }, []);

  const displayItems = getDisplayItems(state);
  const totalPrice = getTotalPrice(state);

  const displayCart = getDisplayCart(state);
  return (
    <div>
      <h1>Seek coding challenge</h1>
      <label htmlFor="customer-id">Customer Id</label>
      <input id="customer-id" value={state.customerId} onChange={e => { dispatch({ type: ActionTypes.updateCustomer, customer: e.target.value })}}/>

      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          displayItems.map(({ displayPrice, ...item })=> (
            <tr>
              <td>{item.name}</td>
              <td>{displayPrice}</td>
              <td><button onClick={() => {dispatch({ type: ActionTypes.addItem, item })}}>Add to cart</button></td>
            </tr>
          ))
        }
      </tbody>
      </table>
      <h2>Cart</h2>
      <div> Total: {totalPrice}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Discounted Price</th>
          </tr>
        </thead>
        <tbody>
        {
          displayCart.map(({ displayPrice, displayDiscountPrice, ...item })=> (
            <tr>
              <td>{item.name}</td>
              <td>{displayPrice}</td>
              <td>{displayDiscountPrice}</td>
            </tr>
          ))
        }
      </tbody>
      </table>
    </div>
  );
}

export default App;
