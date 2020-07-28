import React from 'react';
import './ProductAdd.css';
import ProductForm from '../../components/ProductForm/ProductForm'
import {Consumer} from '../../context';

const ProductAdd = () => {

  const handleProductSubmit = (dispatch, product) => {
    dispatch({type: 'ADD_PRODUCT', payload: product});
  }

  return (
    <Consumer>
      {value => {
        const {dispatch} = value;
        return (
          <>
            <ProductForm formMode="CREATE" onSubmit={(product) => handleProductSubmit(dispatch, product)}/>
          </>
        )
      }}
    </Consumer>
  )
}

export default ProductAdd;