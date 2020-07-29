import React from 'react';
import {Consumer} from '../../context';
import ProductForm from '../../components/ProductForm/ProductForm';

const product = (props) => {
  return (
    <Consumer>
      {value => {
        const {dispatch} = value;
        return (
          <>
            <ProductForm formMode="VIEW" />
          </>
        )
      }}
    </Consumer>
  );
}

export default product;