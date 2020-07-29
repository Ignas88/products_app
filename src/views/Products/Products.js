import React from 'react';
import {withRouter} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {AddBoxTwoTone} from '@material-ui/icons';
import ProductRow from '../../components/ProductRow/ProductRow';
import {Consumer} from '../../context';
import './Products.css';

const products = (props) => {

  const handleAddClick = () => {
    props.history.push('/products/create');
  }

  return (
    <TableContainer component={Paper}>
      <Table className="table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Weight, Kg</TableCell>
            <TableCell>Price, €</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Active</TableCell>
            <TableCell/>
            <TableCell style={{position: 'relative'}}>
              <span className="add-btn" onClick={handleAddClick}>
                <AddBoxTwoTone/>
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <Consumer>
          {value => {
            const {products} = value;
            return (
              <TableBody>
                {products.map(product =>
                  <ProductRow
                    key={product.id} product={product}
                  />
                )}
              </TableBody>
            )
          }}
        </Consumer>
      </Table>
    </TableContainer>
  );
}

export default withRouter(products);