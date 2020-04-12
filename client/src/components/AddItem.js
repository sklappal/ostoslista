import React from 'react';

export class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    var cats = this.props.categories.map((cat) => <option value={cat} key={cat}>{cat}</option>)
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

export default AddItem;