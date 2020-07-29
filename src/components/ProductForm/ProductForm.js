import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import shortid from 'shortid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {productTypes, productColors} from '../../utils/selectOptions';
import './ProductForm.css';
import {getItem} from '../../utils/utils';

// inputus reiketu padaryti kaip atskirus pernaudojamus komponentus, uzdeti validacijas, kainai, svoriui reikšmės formatavima,
// del laiko stygiaus to nedarau;

const ProductForm = ({formMode, history, match, onSubmit}) => {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    color: '',
    active: false,
    weight: 0,
    qty: 0,
    price: 0,
  });

  useEffect(() => {
    if (formMode === 'VIEW' || formMode === 'EDIT') {
      const id = match.params.id;
      const product = getItem('products', id);
      if (product) {
        console.log(product)
        setProduct(product);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const {type, checked, value, name} = e.target;
    let val = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);
    setProduct({
      ...product,
      [name]: val
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'VIEW') {
      history.push(`/products/${product.id}/edit`);
    } else {
      let newProduct = formMode === 'EDIT' ?
        product :
        {
          ...product,
          id: shortid.generate(),
          EAN: shortid.generate(),
          priceHistory: [{date: new Date(), price: product.price}],
          qtyHistory: [{date: new Date(), qty: product.qty}]
        }
      onSubmit(newProduct);
      setProduct({
        name: '',
        type: '',
        color: '',
        active: false,
        weight: 0,
        qty: 0,
        price: 0,
      });
      history.push(`/products`);
    }
  };

  const onBackClick = () => {
    setProduct({
      name: '',
      type: '',
      color: '',
      active: false,
      weight: 0,
      qty: 0,
      price: 0,
    });
    history.push(`/products`);
  };

  const typeOpts = productTypes.map(type =>
    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
  );

  const colorOpts = productColors.map(color =>
    <MenuItem key={color.value} value={color.value}>
      <div className="color-option">
        {color.label} <span className="color" style={{backgroundColor: color.value}}/>
      </div>
    </MenuItem>
  );

  const {name, type, color, active, price, qty, weight} = product;

  return (
    <Paper elevation={3} className="form-container">
      <form onSubmit={e => onFormSubmit(e)} noValidate autoComplete="off">
        <TextField value={name} label="Name" name="name" variant="outlined" size="small"
                   onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}/>
        {formMode === 'VIEW' ?
          <TextField value={product.EAN ? product.EAN : ''} label="EAN" variant="outlined" size="small" disabled={true}/>
        : null}
        <TextField value={type} label="Type" name="type" variant="outlined" size="small" select
                   onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}>
          {typeOpts}
        </TextField>
        <TextField value={color} label="Color" name="color" variant="outlined" size="small" select
                   onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}>
          {colorOpts}
        </TextField>
        <TextField
          value={weight} label="Weight" name="weight" variant="outlined" size="small" type="number"
          onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}
          InputProps={{startAdornment: <InputAdornment position="start">Kg</InputAdornment>}}
        />
        <TextField value={qty} label="Quantity" name="qty" variant="outlined" size="small" type="number"
                   onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}/>
        <TextField
          value={price} label="Price" name="price" variant="outlined" size="small" type="number"
          onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}
          InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
        />
        <FormControlLabel
          control={<Checkbox checked={active} name="active" color="primary"/>}
          onChange={e => handleInputChange(e)} disabled={formMode === 'VIEW'}
          label="Active" labelPlacement="start"
        />
        <div className="form-buttons">
          <Button type="submit" size="small" variant="contained" color="primary">
            {formMode === 'VIEW' ? 'Edit' : 'Save'}
          </Button>
          <Button size="small" color="secondary" onClick={onBackClick}>Back</Button>
        </div>
      </form>
    </Paper>
  );
}

export default withRouter(ProductForm);