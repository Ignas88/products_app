import React from 'react';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Consumer} from '../../context';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {EditTwoTone, HighlightOffTwoTone} from '@material-ui/icons';
import './ProductRow.css';

const productRow = ({product, history}) => {
  const {name, type, color, qty, id} = product;

  const handleProductClick = () => {
    history.push(`/products/${id}`);
  }

  const handleEditClick = (e) => {
    e.stopPropagation();
    history.push(`/products/${id}/edit`);
  }

  const handleDeleteClick = (dispatch, e) => {
    e.stopPropagation();
    dispatch({type: 'DELETE_PRODUCT', payload: id});
  }

  return (
    <Consumer>
      {value => {
        const {dispatch} = value;
        return (
          <TableRow className="product-row" onClick={handleProductClick}>
            <TableCell>{name}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{color}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell className="product-control">
              <span onClick={handleEditClick}>
                <EditTwoTone/>
              </span>
            </TableCell>
            <TableCell className="product-control">
              <span onClick={(e) => handleDeleteClick(dispatch, e)}>
                <HighlightOffTwoTone/>
              </span>
            </TableCell>
          </TableRow>
        )
      }}
    </Consumer>
  )
}

productRow.porpTypes = {
  product: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(productRow);