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
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      token: PropTypes.object.isRequired,
    }),
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
  
  createAuth = () => {
    console.log('clicked')
    const { client, salesforceAuthCreate } = this.props
    const callbackUrl = window.location.href
    if (callbackUrl.includes('/salesforce/callback')) return salesforceAuthCreate(client, callbackUrl)
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
        
        <button onClick={this.createAuth}>Post Auth!</button>
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
const connected = connect(mapStateToProps, { salesforceAuthRequest, salesforceAuthCreate })(Auth)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
  form: 'salesforce',
})(connected)

export default formed
