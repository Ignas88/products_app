import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './ViewTabs.css';

const ViewTabs = ({tabs, activeTab, onTabClick}) => {

  return (
    <Paper className="tabsContainer">
      <Tabs
        value={activeTab}
        onChange={onTabClick}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabs.map((tab, idx) =>
          <Tab key={idx} label={tab.title} />
        )}
      </Tabs>
    </Paper>
  );
}

export default ViewTabs;