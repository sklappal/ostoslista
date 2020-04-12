import React from 'react';
import renderLineItem from './utils.js'
import categories from './categories'

function ShoppingItemList(props) {
  var grouped = categories.map(cat => {
    return {cat: cat, items: props.items.filter(val => val.category === cat)}
  });
  return grouped.map(item => {
    var individualItems = item.items.map(i => renderLineItem(i, i.addedTime, "Merkkaa ostetuksi", () => props.buyItem(i.id)));
    if (individualItems.length > 0)
    {
      return (
        <div key={item.cat}>
          <h2>{item.cat}</h2>
          <ul>
            {individualItems}
          </ul>
        </div>
      );
    }
    return (
      <div key={item.cat}>
        <h2>{item.cat}</h2>
        Ei tuotteita.
      </div>
    );
  });
}

export default ShoppingItemList;