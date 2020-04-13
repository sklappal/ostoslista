import React from 'react';
import categories from './categories'
import "../styles/AddItem.css"

function CategorySelector(props) {
  const cats = categories.map(
    (cat) => {
    return (
    <div
      key={cat[0]}
        className={"Category__item" + (props.selected===cat[0] ? " selected" : "")} 
        onClick={() => props.onSelectCategory(cat[0])}>{cat[1]}
    </div>);
    });
  return (
      <div className="Category__row">
        {cats}
      </div>
  )
}

export class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "", selected: ""};
  }

  render() {
    return (
      <div className="TopContainer">
        <div className="AddItemContainer">
          <input className="AddItemElement" type="text" placeholder="Tuotteen nimi" value={this.state.text} onChange={ev => this.setState({text: ev.target.value})}/>
          <button className="AddItemElement"  onClick={() => this.onClick()} disabled={this.state.text.length === 0 || this.state.selected === ""}> Lisää </button>
        </div>
      <CategorySelector selected={this.state.selected} onSelectCategory={(cat) => this.onSelectCategory(cat)}/>
      </div>
    );

  }

  onClick() {
    this.props.onAdd(this.state.text, this.state.selected);
    this.setState({text: "", selected: ""});
  }

  onSelectCategory(cat) {
    this.setState({...this.state, selected: this.state.selected===cat ? "" : cat});
  }
}

export default AddItem;