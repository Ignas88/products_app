import React, {Component} from 'react';
import {setLocStorage} from './utils/utils';

const Context = React.createContext();

const reducer = (state, action) => {
  let updatedProducts = null;
  switch (action.type) {
    case 'DELETE_PRODUCT':
      updatedProducts = state.products.filter(product => product.id !== action.payload);
      setLocStorage('products', updatedProducts);
      return {
        ...state,
        products: updatedProducts
      };
    case 'ADD_PRODUCT':
      updatedProducts = [action.payload, ...state.products];
      setLocStorage('products', updatedProducts);
      return {
        ...state,
        products: updatedProducts
      };
    case 'UPDATE_PRODUCT':
      const prevUpdatedProduct = state.products.find(product => product.id === action.payload.id);
      let updatedProduct = {...action.payload};
      if (prevUpdatedProduct.price !== action.payload.price) {
        updatedProduct = {
          ...updatedProduct,
          priceHistory: [...prevUpdatedProduct.priceHistory, {date: new Date(), price: updatedProduct.price}],
        }
      }
      if (prevUpdatedProduct.qty !== action.payload.qty) {
        updatedProduct = {
          ...updatedProduct,
          qtyHistory: [...prevUpdatedProduct.qtyHistory, {date: new Date(), qty: updatedProduct.qty}],
        }
      }
      updatedProducts = state.products.map(product => product.id === updatedProduct.id ? (product = updatedProduct) : product);
      setLocStorage('products', updatedProducts);
      return {
        ...state,
        products: updatedProducts
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    products: [
      {
        id: '1',
        name: 'Product1',
        EAN: '1234567893',
        type: 'type1',
        weight: 100,
        color: '#008000',
        active: true,
        qty: 40,
        price: 5,
        priceHistory: [],
        qtyHistory: []
      },
      {
        id: '2',
        name: 'Product2',
        EAN: '1234567892',
        type: 'type2',
        weight: 200,
        color: '#008000',
        active: true,
        qty: 10,
        price: 20,
        priceHistory: [],
        qtyHistory: []
      },
      {
        id: '3',
        name: 'Product3',
        EAN: '1234567891',
        type: 'type3',
        weight: 300,
        color: '#008000',
        active: true,
        qty: 30,
        price: 6,
        priceHistory: [],
        qtyHistory: []
      }
    ],
    dispatch: action => {
      this.setState(state =>
        reducer(state, action))
    }
  };

  componentDidMount() {
    let products = window.localStorage.getItem('products');
    if (!products) {
      setLocStorage('products', this.state.products);
    } else {
      products = JSON.parse(products);
      this.setState({products});
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;