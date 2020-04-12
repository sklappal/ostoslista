import { connect } from 'react-redux'
import { returnItem } from '../actions'
import BoughtItemList from '../components/BoughtItemList';


const mapStateToProps = state => ({
  items: state.boughtItems
})

const mapDispatchToProps = dispatch => ({
  returnItem: id => dispatch(returnItem(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoughtItemList)
