import { connect } from 'react-redux'
import { returnItem, removeItem } from '../actions'
import BoughtItemList from '../components/BoughtItemList';


const mapStateToProps = state => ({
  items: state.boughtItems
})

const mapDispatchToProps = dispatch => ({
  returnItem: id => dispatch(returnItem(id)),
  removeItem: id => dispatch(removeItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoughtItemList)
