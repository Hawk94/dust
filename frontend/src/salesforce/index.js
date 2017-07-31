import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// include our salesforceAuthRequest action
import { salesforceAuthRequest } from './actions'

class Instructions extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    salesforceAuthRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      token: PropTypes.object.isRequired,
    }),
  }


  submit = () => {
    const { client, salesforceAuthRequest, reset } = this.props
    // call to our instructionCreate action.
    instructionCreate(client, instruction)
    // reset the form upon submit.
    reset()
  }


  render () {
    // pull in all needed props for the view
    const {
      handleSubmit,
      invalid,
      instructions: {
        list,
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="salesforce_auth">
        
      </div>
    )
  }
}
