import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

// include our salesforceAuthRequest action
import { salesforceAuthRequest } from './actions'

class Salesforce extends Component {
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

  render () {

    return (
      <div className="salesforce_auth">
        <button onclick="salesforceAuthRequestApi()">
          Connect with Salesforce
        </button>
      </div>
    )
  }
}
