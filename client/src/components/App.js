import React from 'react';
import '../styles/App.css';

import AddItemContainer from '../containers/AddItemContainer'
import ShoppingItemListContainer from '../containers/ShoppingItemListContainer'
import BoughtItemListContainer from '../containers/BoughtItemListContainer'


class App extends React.Component {
  componentDidMount() {
    this.props.requestData();
  }

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
