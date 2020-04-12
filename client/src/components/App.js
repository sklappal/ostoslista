import React from 'react';
import '../styles/App.css';
import moment from 'moment';
import { setInterval, clearInterval } from 'timers';

import AddItemContainer from '../containers/AddItemContainer'
import ShoppingItemListContainer from '../containers/ShoppingItemListContainer'
import BoughtItemListContainer from '../containers/BoughtItemListContainer'


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <AddItemContainer />
        <ShoppingItemListContainer />
        <BoughtItemListContainer />
      </div>
    );
  }
}

export default App;
