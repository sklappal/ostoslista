import React from 'react';
import './App.css';
import moment from 'moment';
import { setInterval, clearInterval } from 'timers';

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
        <AddItem onAdd={(item, category) => this.onItemAdded(item, category)} />
        <ShoppingItemList items={this.state.items} onItemBought={(id) => this.onItemBought(id)} />
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

function renderLineItem(item, time, buttontext, fn) {
  return (
    <LineItem 
      key={item.key}
      id={item.key}
      text={item.text} 
      time={time}
      buttonText={buttontext}
      onMark={fn}
     />
  );
}

function ShoppingItemList(props) {
  var grouped = categories.map(cat => {
    return {cat: cat, items: props.items.filter(val => val.category === cat)}
  });
  return grouped.map(item => {
    var individualItems = item.items.map(i => renderLineItem(i, i.addedTime, "Merkkaa ostetuksi", () => props.onItemBought(i.key)));
    if (individualItems.length > 0)
    {
      return (
        <div key={item.cat}>
          <h2>{item.cat}</h2>
          <ul>
            {individualItems}
          </ul>
        </div>
      );
    }
    return (
      <div key={item.cat}>
        <h2>{item.cat}</h2>
        Ei tuotteita.
      </div>
    );
  });
}

function BoughtItemList(props) {
  var boughtItems = props.items.map((item) => 
    renderLineItem(item, item.boughtTime, "Palauta", () => props.onReturn(item.key))
  );
  if (props.items.length === 0) {
    return null;
  }
  return (
      <div>
        <hr />
        <h2>Ostetut</h2>
        <ul>
          {boughtItems}
        </ul>
      </div>
    );
}

class LineItem extends React.Component {
  timeSince(date) {
    var mom = moment(date);

    if (mom.isBetween(moment().subtract({seconds: 60}), moment().add({seconds: 2}))) {
      return "hetki sitten";
    }

    if (moment().isSame(mom, 'day'))
      return "tänään";
    
      if (moment().subtract({days: 1}).isSame(mom, 'day'))
      return "eilen";

    if (moment().isSame(mom, 'week'))
      return "tällä viikolla";

    if (moment().subtract({weeks: 1}).isSame(mom, 'week'))
      return "viime viikolla";

    return "aiemmin";
  }

  constructor(props) {
    super(props);
    this.state = {
      timeSince: this.timeSince(props.time)
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({timeSince: this.timeSince(this.props.time)})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <li key={this.props.id}>
        {this.props.text} ({this.state.timeSince}) <button onClick={() => this.props.onMark()}> {this.props.buttonText} </button>
      </li>
    );
  }
}

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    var cats = categories.map((cat) => <option value={cat} key={cat}>{cat}</option>)
    return (
      <div>
        <input type="text" placeholder="Tuotteen nimi" value={this.state.text} onChange={ev => this.setState({text: ev.target.value})}/>
        <select id="category">
         {cats}
        </select>
        <button onClick={() => this.onClick()} disabled={this.state.text.length === 0}> Lisää ostoslistaan </button>
      </div>
    );
  }

  onClick() {
    this.props.onAdd(this.state.text, document.getElementById("category").value);
    this.setState({text: ""});
  }

}

export default App;
