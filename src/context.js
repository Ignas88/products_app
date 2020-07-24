import React, {Component} from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? (product = action.payload) : product)
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    products: [
      {
        id: 1,
        name: '',
        EAN: 'Jon Doe',
        type: 'jdoe@gmail.com',
        weight: '555-555-55555',
        color: '555-555-55555',
        active: true,
        qty: 0,
        price: 1
      },
      {
        id: 2,
        name: '',
        EAN: 'Jon Doe',
        type: 'jdoe@gmail.com',
        weight: '555-555-55555',
        color: '555-555-55555',
        active: true,
        qty: 0,
        price: 1
      },
      {
        id: 3,
        name: '',
        EAN: 'Jon Doe',
        type: 'jdoe@gmail.com',
        weight: '555-555-55555',
        color: '555-555-55555',
        active: true,
        qty: 0,
        price: 1
      }
    ],
    dispatch: action => {
      this.setState(state =>
        reducer(state, action))
    }
  };

  async componentDidMount() {
    // this.setState({Products: res.data});
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