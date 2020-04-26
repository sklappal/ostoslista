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
  initialState = {text: "", comment: "", selectedCategory: ""};
  
  constructor(props) {
    super(props);
    this.state = {...this.initialState, expanded: false};
  }

  render() {
    return (
        <>
          <span className="AddItem__expand" onClick={() => this.setState({...this.state, expanded: !this.state.expanded})}> {this.state.expanded ? "Piilota" :  "Lisää tuote"}</span>
          {this.state.expanded && (
            <div className="TopContainer">
                <input className="AddItemElement" type="text" placeholder="Tuotteen nimi" value={this.state.text} onChange={ev => this.setState({...this.state, text: ev.target.value})}/>
                <input className="AddItemElement" type="text" placeholder="Lisätietoa" value={this.state.comment} onChange={ev => this.setState({comment: ev.target.value})}/>
                <CategorySelector selected={this.state.selectedCategory} onSelectCategory={(cat) => this.onSelectCategory(cat)}/>
                <button className="AddItemElement__button"  onClick={() => this.onClick()} disabled={this.state.text.length === 0 || this.state.selectedCategory === ""}> Lisää </button>
            </div>
          )}
        </>
    );

  }

  onClick() {
    this.props.onAdd(this.state.text, this.state.comment, this.state.selectedCategory);
    this.setState( {...this.initialState, expanded: this.state.expanded});
  }

  onSelectCategory(cat) {
    this.setState({...this.state, selectedCategory: this.state.selectedCategory===cat ? "" : cat});
  }
}

export default AddItem;