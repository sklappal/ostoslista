import React from 'react';
import categories from './categories'
import "../styles/AddItem.css"

export class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    var cats = categories.map((cat) => <option value={cat} key={cat}>{cat}</option>)
    return (
      <div className="AddItemContainer">
        <input className="AddItemElement" type="text" placeholder="Tuotteen nimi" value={this.state.text} onChange={ev => this.setState({text: ev.target.value})}/>
        <select className="AddItemElement"  id="category">
         {cats}
        </select>
        <button className="AddItemElement"  onClick={() => this.onClick()} disabled={this.state.text.length === 0}> Lisää </button>
      </div>
    );
  }

  onClick() {
    this.props.onAdd(this.state.text, document.getElementById("category").value);
    this.setState({text: ""});
  }
}

export default AddItem;