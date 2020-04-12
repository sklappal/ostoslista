import React from 'react';
import { connect } from 'react-redux'
import { addItem } from '../actions'
import AddItem from '../components/AddItem'

const AddItemContainer = ({ dispatch }) => {
  return (<AddItem onAdd={(item, category) => dispatch(addItem(item, category))} />)
}

export default connect()(AddItemContainer)
