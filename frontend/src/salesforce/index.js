import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { salesforceAuthRequest } from './actions'


class Auth extends Component {
  // Pass the correct proptypes in for validation
  static propTypes = {
    handleSubmit: PropTypes.func,
    salesforceAuthRequest: PropTypes.func,
    salesforce: PropTypes.shape({
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }),
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
