import React from 'react';
import { connect } from 'react-redux'
import { addItem } from '../actions'
import AddItem from '../components/AddItem'

const AddItemContainer = ({ dispatch }) => {
  return (<AddItem onAdd={(text, comment, category) => dispatch(addItem(text, comment, category))} />)
}

export default connect()(AddItemContainer)
