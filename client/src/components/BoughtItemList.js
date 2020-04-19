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
  const sorted = props.items.sort((a, b) => b.boughtTime - a.boughtTime);
  const boughtItems = sorted.reduce((acc, curr) => {
    const currTime = moment(curr.boughtTime);
    if (acc.length === 0) {
      acc = acc.concat((<div>{ToLabel(currTime)}</div>));
    } else {
      var prevTime = moment(acc[acc.length-1].boughtTime);
      if (!currTime.isSame(prevTime, 'day')) {
        acc = acc.concat((<div>{ToLabel(currTime)}</div>))
      }
    }

    return acc.concat(renderLineItem(curr, curr.addedTime, "⬆️", () => props.returnItem(curr.id), () => props.removeItem(curr.id)))
  }, []);
  if (props.items.length === 0) {
    return null;
  }
  return (
      <div className="BoughtItemsContainer">
        <h2>Ostetut</h2>
        {boughtItems}
      </div>
    );
}

export default BoughtItemList;