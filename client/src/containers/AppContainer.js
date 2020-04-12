import { connect } from 'react-redux'
import { requestData } from '../actions'
import App from '../components/App'


const mapDispatchToProps = dispatch => ({
  requestData: () => dispatch(requestData())
})

export default connect(
  null,
  mapDispatchToProps
)(App)
