import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import ClientOAuth2 from 'client-oauth2'

class Salesforce extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const salesforceBaseUrl = `${process.env.SALESFORCE_BASE_URL}`
    const salesforceClientId = `${process.env.SALESFORCE_CONSUMER_KEY}`
    const salesforceClientSecret = `${process.env.SALESFORCE_CONSUMER_SECRET}`
    const salesforceResponseUri = `${process.env.SALESFORCE_RESPONSE_URI}`

    const salesforceAuth = new ClientOAuth2({
      clientId: salesforceClientId,
      clientSecret: salesforceClientSecret,
      accessTokenUri: `${salesforceBaseUrl}/token`,
      authorizationUri: `${salesforceBaseUrl}/authorize`,
      redirectUri: 'http://dust-prod.herokuapp.com/auth/salesforce/callback',
    })

    const auth_url = salesforceAuth.code.getUri()

    window.location.href = auth_url;
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Connect with Salesforce
      </button>
    );
  }
}
