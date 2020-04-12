import React from 'react'
import LineItem from './LineItem.js'

function renderLineItem(item, time, buttontext, fn) {
  return (
    <LineItem 
      key={item.key}
      id={item.key}
      text={item.text} 
      time={time}
      buttonText={buttontext}
      onMark={fn}
     />
  );
}

export default renderLineItem;