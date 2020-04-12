import { combineReducers } from 'redux'

const defaultState = {
  items: [], 
  boughtItems: []};

const items = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: state.items.concat({text: action.text, category: action.category, id: action.id, addedTime: new Date()}),
        boughtItems: state.boughtItems
      }
    case 'BUY_ITEM': {
      const boughtItem = {
        ...state.items.filter(it => it.id === action.id)[0],
        boughtTime: new Date()
      };
      return {
        items: state.items.filter(it => it.id !== action.id),
        boughtItems: state.boughtItems.concat(boughtItem)        
      };
    }
    case 'RETURN_ITEM': {
      const newItem = {
        ...state.boughtItems.filter(it => it.id === action.id)[0],
        boughtTime: null
      };
  
      return {
        items: state.items.concat(newItem),
        boughtItems: state.boughtItems.filter(it => it.id !== action.id)        
      };    
    } 
    default:
      return state
  }
}

export default items;