import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { salesforceAuthRequest, salesforceAuthCreate } from './actions'


class Auth extends Component {
  // Pass the correct proptypes in for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    salesforceAuthRequest: PropTypes.func,
    salesforceAuthCreate: PropTypes.func,
    salesforce: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
  }
  
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.createAuth()
  }
  
  // the helper function for requesting instructions
  // with our client as the parameter
  createAuth = () => {
    const { salesforce } = this.props
    const callbackUrl = window.location.href
    if (callbackUrl.split('?', 1) == `${process.env.REACT_APP_API_URL}/salesforce/callback` ) return salesforceAuthCreate()
    return false
  }

  submit = () => {
    this.props.salesforceAuthRequest()
  }

  render () {
    const {
      handleSubmit, // remember, Redux Form injects this into our props
    } = this.props

    return (
      <div className="salesforce">
        <form className="authentication-form" onSubmit={handleSubmit(this.submit)}>
          <h1>Salesforce</h1>
          <button action="submit">Connect!</button>
        </form>
      </div>
    )
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  salesforce: state.salesforce,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { salesforceAuthRequest })(Auth)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'salesforce',
})(connected)

export default formed
