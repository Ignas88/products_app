import React from 'react';
import {Consumer} from '../../context';
import ProductForm from '../../components/ProductForm/ProductForm';

const ProductEdit = (props) => {

  const handleProductSubmit = (dispatch, product) => {
    dispatch({type: 'UPDATE_PRODUCT', payload: product});
  }

  return (
    <Consumer>
      {value => {
        const {dispatch} = value;
        return (
          <>
            <ProductForm formMode="EDIT" onSubmit={(product) => handleProductSubmit(dispatch, product)} />
          </>
        )
      }}
    </Consumer>
  );
}

export default ProductEdit;