import React from 'react';
import moment from 'moment';
import renderLineItem from './utils.js'
import '../styles/BoughtItemList.css';


function ToLabel(mom) {
  moment.locale('fi');

  if (moment().isSame(mom, 'day')) {
    return "Tänään";
  }

  if (moment().subtract({days: 1}).isSame(mom, 'day'))
      return "Eilen";

  return mom.format('dddd D.M.');
}

function BoughtItemList(props) {
  if (props.items.length === 0) {
    return null;
  }
  const sorted = props.items.sort((a, b) => b.boughtTime - a.boughtTime);

  var boughtItems = [];
  var prev = undefined;
  sorted.forEach(curr => {
    const currTime = moment(curr.boughtTime);
    if (boughtItems.length === 0) {
      boughtItems = boughtItems.concat((<div>{ToLabel(currTime)}</div>));
    } else {
      var prevTime = moment(prev.boughtTime);
      if (!currTime.isSame(prevTime, 'day')) {
        boughtItems = boughtItems.concat((<div>{ToLabel(currTime)}</div>))
      }
    }

    boughtItems = boughtItems.concat(renderLineItem(curr, curr.addedTime, "⬆️", () => props.returnItem(curr.id), () => props.removeItem(curr.id)));
    prev = curr;
  });
  
  return (
      <div className="BoughtItemsContainer">
        <h2>Ostetut</h2>
        {boughtItems}
      </div>
    );
}

export default BoughtItemList;
