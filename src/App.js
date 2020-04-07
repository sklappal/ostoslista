import React from 'react';
import './App.css';

var categories = ["Vihannekset", "Maitotuotteet", "Juomat", "Muut"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      boughtItems: [],
      nextKey: 0 };
    
  }

  render() {
    var grouped = categories.map(cat => {
      return {cat: cat, items: this.state.items.filter(val => val.category === cat)}
    });
    var lists = grouped.map(item => {
      var individualItems = item.items.map(i => this.renderLineItem(i, i.addedTime, true));
      if (individualItems.length > 0)
      {
        return (
          <div>
            <h2>{item.cat}</h2>
            <ul>
              {individualItems}
            </ul>
          </div>
        );
      }
    });

    var boughtItems = this.state.boughtItems.map((item) => 
      this.renderLineItem(item, item.boughtTime)
    );
    return (
      <div className="App">
        <AddItem onAdd={(item, category) => this.onItemAdded(item, category)} />
        {(this.state.items.length > 0 ? <hr /> : null)}
          {lists}
    {(this.state.boughtItems.length > 0 ? (<div><hr /> <h2>Ostetut</h2></div>) : null)}
        <ul>
          {boughtItems}
        </ul>
      </div>
    );
  }

  renderLineItem(item, time, btn) {
    return (
      <LineItem 
        key={item.key}
        text={item.text} 
        time={time}
        onMark={() => this.onMark(item.key)}
        showButton={!!btn}
       />
    );
  }

  onItemAdded(item, category) {
    console.log(category);
    this.setState(
      {
        items: this.state.items.concat({text: item, category: category, key: this.state.nextKey, addedTime: new Date()}),
        boughtItems: this.state.boughtItems,
        nextKey: this.state.nextKey+1
      });
  }

  onMark(id) {
    var newItems = this.state.items.reduce((acc, curr) => {
      if (curr.key !== id) {
        return acc.concat(curr);
      }
      return acc;
    }, []);

    var boughtItem = this.state.items.reduce((acc, curr) => {
      if (curr.key === id) {
        return curr;
      }
      return acc;
    }, null);

    boughtItem = {
      text: boughtItem.text,
      key: boughtItem.key,
      addedTime: boughtItem.addedTime,
      boughtTime: new Date()
    };

    this.setState({
      items: newItems,
      boughtItems: this.state.boughtItems.concat(boughtItem),
      nextKey: this.state.nextKey
    });
  }
}

function LineItem(props) {
  function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " y";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " kk";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " pv";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " h";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " m";
    }
    return Math.floor(seconds) + " s";
  }


  return (
    <li>{props.text} ({timeSince(props.time)} sitten) {props.showButton ? <button onClick={() => props.onMark()}> Merkkaa ostetuksi </button> : null}
    </li>
  );
}

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    var cats = categories.map((cat) => <option value={cat}>{cat}</option>)
    return (
      <div>
        <input type="text" value={this.state.text} onInput={ev => this.setState({text: ev.target.value})}/>
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
