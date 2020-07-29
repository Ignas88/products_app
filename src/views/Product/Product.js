import React, {useState} from 'react';
import ViewTabs from '../../components/ViewTabs/ViewTabs';
import ProductForm from '../../components/ProductForm/ProductForm';
import HistoryChart from '../../components/HistoryChart/HistoryChart';

const tabs = [{title: 'Product details', name: 'details'}, {title: 'Price history', name: 'price'}, {title: 'Quantity History', name: 'qty'}];

const Product = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (e, newValue) => {
    setActiveTab(newValue);
  }
  return (
    <>
      <ViewTabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
      {activeTab === 0 ?
        <ProductForm formMode="VIEW"/> :
        <HistoryChart subject={tabs[activeTab].name} />
      }
    </>
  );
}

export default Product;