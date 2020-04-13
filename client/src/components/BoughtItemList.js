import React from 'react';
import renderLineItem from './utils.js'
import '../styles/BoughtItemList.css';


function BoughtItemList(props) {
  var boughtItems = props.items.map((item) => 
    renderLineItem(item, item.boughtTime, "⬆️", () => props.returnItem(item.id), () => props.removeItem(item.id))
  );
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