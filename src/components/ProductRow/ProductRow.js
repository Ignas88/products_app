import React from 'react';
import {withRouter} from 'react-router-dom'
import {Consumer} from '../../context';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import {EditTwoTone, HighlightOffTwoTone} from '@material-ui/icons';
import './ProductRow.css';

const productRow = ({product, history}) => {
  const {id, name, type, color, qty, active, price, weight} = product;
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

  const handleActiveClick = (dispatch, e) => {
    e.stopPropagation();
    const updatedProduct = {
      ...product,
      active: !product.active
    };
    dispatch({type: 'UPDATE_PRODUCT', payload: updatedProduct});
  }

  return (
    <Consumer>
      {value => {
        const {dispatch} = value;
        return (
          <TableRow
            style={qty === 0 ? {backgroundColor: 'pink'} : {}}
            className={`product-row${!active ? ' row-disabled' : ''}`} onClick={handleProductClick}
          >
            <TableCell>{name}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell><span className="color" style={{backgroundColor: color}}/></TableCell>
            <TableCell>{weight}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>
              <Checkbox checked={active} color="primary" onClick={(e) => handleActiveClick(dispatch, e)} />
            </TableCell>
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
  );
}

export default withRouter(productRow);