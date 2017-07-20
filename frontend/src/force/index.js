import React, { Component } from 'react'
import OAuth from 'forcejs/oauth'

export default class forceLogin extends Component{
 
  getForceAuth () {
    const appId = 'Analytics'
    const loginURL = 'https://login.salesforce.com'
    const oauthCallbackURL = 'https://www.example.com/loggedin.html'
    const oauth = OAuth.createInstance(appId, loginURL, oauthCallbackURL)
    console.log(oauth)
  }
 
  render () {
    return (
      <div>
        <button
          onClick={(e) => this.getForceAuth(e)}
        >Click Me</button>
      </div>
    );
  }
 
}