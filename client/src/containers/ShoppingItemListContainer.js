import { connect } from 'react-redux'
import { buyItem, removeItem } from '../actions'
import ShoppingItemList from '../components/ShoppingItemList'


const mapStateToProps = state => ({
  items: state.items
})

const mapDispatchToProps = dispatch => ({
  buyItem: id => dispatch(buyItem(id)),
  removeItem: id => dispatch(removeItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingItemList)
