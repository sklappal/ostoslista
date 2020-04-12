import React from 'react';
import renderLineItem from './utils.js'


function BoughtItemList(props) {
  var boughtItems = props.items.map((item) => 
    renderLineItem(item, item.boughtTime, "Palauta", () => props.returnItem(item.id))
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

export default BoughtItemList;