import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {getItem} from "../../utils/utils";

const chartSubjects = {
  price: {
    title: 'Price, €',
    prop: 'priceHistory',
    name: 'price'
  },
  qty: {
    title: 'Quantity',
    prop: 'qtyHistory',
    name: 'qty'
  }
}

const HistoryChart = ({match, subject}) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const id = match.params.id;
    const product = getItem('products', id);
    if (product) {
      setProduct(product);
    }
  }, []);

  const {title, prop, name} = chartSubjects[subject];

  const options = {
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: title
      }
    },
    xAxis: {
      categories: product && product[prop].map((obj) => new Date(obj.date).toLocaleString())
    },
    series: [{
      name: title,
      data: product && product[prop].map((obj) => obj[name])
    }]
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

export default withRouter(HistoryChart);

