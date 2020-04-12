import React from 'react';
import '../styles/App.css';
import moment from 'moment';
import { setInterval, clearInterval } from 'timers';

import AddItem from './AddItem.js'
import ShoppingItemList from './ShoppingItemList.js'
import BoughtItemList from './BoughtItemList.js'

var categories = ["Hevi", "Kylmätuotteet", "Maitotuotteet", "Juomat", "Pakasteet", "Muut"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      boughtItems: [],
      nextKey: 0 };
  }

  render() {
    return (
      <div className="App">
        <AddItem categories={categories} onAdd={(item, category) => this.onItemAdded(item, category)} />
        <ShoppingItemList items={this.state.items} categories={categories} onItemBought={(id) => this.onItemBought(id)} />
        <BoughtItemList items={this.state.boughtItems} onReturn= {(id) => this.onReturn(id)}/>
      </div>
    );
  }

  onItemAdded(item, category) {
    this.setState(
      {
        items: this.state.items.concat({text: item, category: category, key: this.state.nextKey, addedTime: new Date()}),
        boughtItems: this.state.boughtItems,
        nextKey: this.state.nextKey+1
      });
  }

  onItemBought(id) {
    var boughtItem = {
      ...this.state.items.filter(it => it.key === id)[0],
      boughtTime: new Date()
    };

    this.setState({
      items: this.state.items.filter(it => it.key !== id),
      boughtItems: this.state.boughtItems.concat(boughtItem),
      nextKey: this.state.nextKey
    });
  }

  onReturn(id) {
    var newItem = {
      ...this.state.boughtItems.filter(it => it.key === id)[0],
      boughtTime: null
    };

    this.setState({
      items: this.state.items.concat(newItem),
      boughtItems: this.state.boughtItems.filter(it => it.key !== id),
      nextKey: this.state.nextKey
    });
  }
}

export default App;
