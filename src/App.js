import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      boughtItems: [],
      nextKey: 0 };
    
  }

  render() {
    var items = this.state.items.map((item) => 
      <LineItem 
        key={item.key} 
        text={item.text}
        time={item.addedTime}
        showButton={true} 
        onMark={() => this.onMark(item.key) } /> 
    );
    var boughtItems = this.state.boughtItems.map((item) => 
      <LineItem 
        key={item.key}
        text={item.text} 
        time={item.boughtTime}
       /> 
    );
    return (
      <div className="App">
        <div>
          hello
        </div>
       <AddItem onAdd={(item) => this.onItemAdded(item)} />
       <hr />
      <ul>
        {items}
      </ul>
      <hr/>
      <ul>
        {boughtItems}
      </ul>

      </div>
    );
  }

  onItemAdded(item) {
    this.setState(
      {
        items: this.state.items.concat({text: item, key: this.state.nextKey, addedTime: new Date()}),
        boughtItems: this.state.boughtItems,
        nextKey: this.state.nextKey+1
      });
  }

  onMark(id) {
    var newItems = this.state.items.reduce((prev, curr) => {
      if (curr.key !== id) {
        return prev.concat(curr);
      }
      return prev;
    }, []);
    var boughtItem = this.state.items.reduce((prev, curr) => {
      if (curr.key === id || curr !== null) {
        return curr;
      }
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
    return (
      <div>
        <input type="text" value={this.state.text} onInput={ev => this.setState({text: ev.target.value})}/>
        <button onClick={() => this.onClick()} disabled={this.state.text.length === 0}> Lisää ostoslistaan </button>
      </div>
    );
  }

  onClick() {
    this.props.onAdd(this.state.text);
    this.setState({text: ""});
  }

}

export default App;
