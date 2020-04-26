import React from 'react';
import renderLineItem from './utils.js'
import categories from './categories'
import '../styles/ShoppingItemList.css';

function ShoppingItemList(props) {
  const getContent = () => {
    var grouped = categories.map(cat => {
      return {cat: cat, items: props.items.filter(val => val.category === cat[0])}
    });

    return grouped
    .sort((a, b) => {
      if (a.items.length === 0 && b.items.length === 0) {
        return 0;
      }
      if (a.items.length === 0) {
        return 1;
      }
      if (b.items.length === 0) {
        return -1;
      }
      return 0;
    })    
    .map(item => {
      var individualItems = item.items.map(i => renderLineItem(i, i.addedTime, "✔️", () => props.buyItem(i.id), () => props.removeItem(i.id)));
      if (individualItems.length > 0)
      {
        return (
          <div key={item.cat} className="Items">
            <div className="Items__header">{item.cat}</div>
            {individualItems}
          </div>
        );
      }
      return (
        <div key={item.cat} className="Items">
          <div className="Items__header inactive">{item.cat}</div>
          <div className="Items__row inactive">Ei tuotteita.</div>
        </div>
      );
    });
  }

  return (
    <div className="TopContainer">
      {getContent()}
    </div>
  )
}

export default ShoppingItemList;