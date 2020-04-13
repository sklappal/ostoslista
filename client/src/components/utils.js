import React from 'react'
import LineItem from './LineItem.js'

function renderLineItem(item, time, buttontext, fn, remove) {
  return (
    <LineItem 
      key={item.id}
      id={item.id}
      text={item.text} 
      time={time}
      buttonText={buttontext}
      onMark={fn}
      onRemove={remove}
     />
  );
}

export default renderLineItem;