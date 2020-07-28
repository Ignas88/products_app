import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import shortid from 'shortid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {productTypes, productColors} from '../../utils/selectOptions';
import './ProductForm.css';
import {getItem} from '../../utils/utils';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: '',
        type: '',
        color: '',
        active: false,
        weight: '',
        qty: '',
        price: '',
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const {formMode, match} = this.props;
    if (formMode === 'VIEW' || formMode === 'EDIT') {
      const id = match.params.id;
      const product = getItem('products', id);
      if (product) {
        this.setState({product});
      }
    }
  }

  handleInputChange = (e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      product: {
        ...this.state.product,
        [e.target.name]: value
      }
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const {formMode, history} = this.props;
    const {product} = this.state;
    if (formMode === 'VIEW') {
      history.push(`/products/${product.id}/edit`);
    } else {
      let newProduct = formMode === 'EDIT' ?
        product :
        {
          ...product,
          id: shortid.generate(),
          EAN: shortid.generate()
        }
      this.props.onSubmit(newProduct);
      this.setState({
        product: {
          name: '',
          type: '',
          color: '',
          active: false,
          weight: '',
          qty: '',
          price: '',
        }
      });
      history.push(`/products`);
    }
  }

  render() {
    const {name, type, color, active, price, qty, weight} = this.state.product;
    const typeOpts = productTypes.map(type =>
      <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
    );
    const colorOpts = productColors.map(color =>
      <MenuItem key={color.value} value={color.value}>
        {color.label} <span className="color" style={{backgroundColor: color.value}}/>
      </MenuItem>
    );

    return (
      <Paper elevation={3} className="form-container">
        <form onSubmit={this.onFormSubmit} noValidate autoComplete="off">
          <TextField value={name} label="Name" name="name" variant="outlined" size="small"
                     onChange={this.handleInputChange}/>
          <TextField value={type} label="Type" name="type" variant="outlined" size="small" select
                     onChange={this.handleInputChange}>
            {typeOpts}
          </TextField>
          <TextField value={color} label="Color" name="color" variant="outlined" size="small" select
                     onChange={this.handleInputChange}>
            {colorOpts}
          </TextField>
          <TextField value={weight} label="Weight" name="weight" variant="outlined" size="small" type="number"
                     onChange={this.handleInputChange}/>
          <TextField value={qty} label="Quantity" name="qty" variant="outlined" size="small" type="number"
                     onChange={this.handleInputChange}/>
          <TextField value={price} label="Price" name="price" variant="outlined" size="small" type="number"
                     onChange={this.handleInputChange}/>
          <FormControlLabel
            control={<Checkbox checked={active} name="active" color="primary"/>}
            onChange={this.handleInputChange}
            label="Active"
            labelPlacement="start"
          />
          <div className="form-buttons">
            <Button type="submit" size="small" variant="contained" color="primary">
              {this.props.formMode === 'VIEW' ? 'Edit' : 'Save'}
            </Button>
            <Button size="small" color="secondary">Back</Button>
          </div>
        </form>
      </Paper>
    )
  }
}

export default withRouter(ProductForm);