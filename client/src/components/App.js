import React from 'react';
import moment from 'moment';
import '../styles/App.css';

import AddItemContainer from '../containers/AddItemContainer'
import ShoppingItemListContainer from '../containers/ShoppingItemListContainer'
import BoughtItemListContainer from '../containers/BoughtItemListContainer'


class App extends React.Component {
  componentDidMount() {
    moment.locale('fi', {
      weekdays: 'Sunnuntai_Maanantai_Tiistai_Keskiviikko_Torstai_Perjantai_Lauantai'.split('_'),
      week : {
            dow : 1
      }
    });
    this.props.requestData();
  }

  render() {
    return (
      <div className="App">
        <AddItemContainer />
        <ShoppingItemListContainer className="ShoppingItemListContainer"/>
        <BoughtItemListContainer />
      </div>
    );
  }
}

export default App;
