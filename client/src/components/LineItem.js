import React from 'react';
import moment from 'moment';
import '../styles/LineItem.css';

class LineItem extends React.Component {
  timeSince(date) {
    var mom = moment(new Date(date));
    
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
      timeSince: this.timeSince(props.time),
      expanded: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({...this.state,timeSince: this.timeSince(this.props.time)})
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  remove() {
    if (window.confirm("Haluatko poistaa tuotteen kokonaan?")) {
      this.props.onRemove();
    }
  }

  expand() {
    this.setState({...this.state, expanded: !this.state.expanded});
  }

  render() {
    var expansion = this.state.expanded && (
      <div className="LineItem__row">
        <div className="LineItem LineItem__text">Lisätty {this.state.timeSince}</div>
      </div>);
    
    return (
      <div className={"LineItemContainer" + (this.state.expanded ? " LineItem__expanded" : "")}  onClick={() =>  this.expand()}>
        <div className="LineItem__row">
          <div className="LineItem LineItem__text">{this.props.text}  </div>
          {this.state.expanded && (<button className="LineItem LineItem__button" onClick={() => this.remove()}> ❌ </button>)}
          <button className="LineItem LineItem__button" onClick={(e) => {e.stopPropagation();this.props.onMark()} }> {this.props.buttonText} </button>
        </div>
        {expansion}
      </div>
    );
  }
}

export default LineItem;