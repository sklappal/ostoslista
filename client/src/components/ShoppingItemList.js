import React from 'react';
import renderLineItem from './utils.js'
import categories from './categories'
import '../styles/ShoppingItemList.css';

function ShoppingItemList(props) {
  var grouped = categories.map(cat => {
    return {cat: cat, items: props.items.filter(val => val.category === cat)}
  });
  return grouped.map(item => {
    var individualItems = item.items.map(i => renderLineItem(i, i.addedTime, "✔️", () => props.buyItem(i.id), () => props.removeItem(i.id)));
    if (individualItems.length > 0)
    {
      return (
        <div key={item.cat} className="Items">
          <h4>{item.cat}</h4>
          {individualItems}
        </div>
      );
    }
    return (
      <div key={item.cat}>
        <h4>{item.cat}</h4>
        Ei tuotteita.
      </div>
    );
  });
}

export default ShoppingItemList;