import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our instructionRequest action
import { instructionCreate, instructionRequest } from './actions'

class Instructions extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      token: PropTypes.object.isRequired,
    }),
    instructions: PropTypes.shape({
      list: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    instructionCreate: PropTypes.func.isRequired,
    instructionRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.fetchInstructions()
  }

  // the helper function for requesting instructions
  // with our client as the parameter
  fetchInstructions = () => {
    const { client, instructionRequest } = this.props
    if (client && client.token) return instructionRequest(client)
    return false
  }


  submit = (instruction) => {
    const { client, instructionCreate, reset } = this.props
    // call to our instructionCreate action.
    instructionCreate(client, instruction)
    // reset the form upon submit.
    reset()
  }


  render () {
    // pull in all needed props for the view
    // `invalid` is a value that Redux Form injects
    // that states whether or not our form is valid/invalid.
    // This is only relevant if we are using the concept of
    // `validators` in our form.
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
      <div className="instructions">
        <div className="instruction-form">
          <form onSubmit={handleSubmit(this.submit)}>
            <h1>Setup instruction</h1>
            {/* We will use a custom component AND a validator */}
            <label htmlFor="amount">Amount</label>
            <Field
              name="amount"
              type="number"
              id="amount"
              className="number"
              component="input"
            />
            <label htmlFor="BTC_split">BTC Split</label>
            <Field
              name="BTC_split"
              type="number"
              id="BTC_split"
              className="number"
              component="input"
            />
            <label htmlFor="ETH_split">ETH Split</label>
            <Field
              name="ETH_split"
              type="number"
              id="ETH_split"
              className="number"
              component="input"
            />
            <label htmlFor="LTC_split">LTC Split</label>
            <Field
              name="LTC_split"
              type="number"
              id="ltc_split"
              className="number"
              component="input"
            />
            {/* the button will remain disabled until not invalid */}
            <button
              disabled={invalid}
              action="submit"
            >Create</button>
          </form>
          <hr />
          <div className="instruction-messages">
            {requesting && <span>Creating instruction...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create instruction due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
        {/* The instruction List Area */}
        <div className="instruction-list">
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Amount</th>
                <th>BTC Split</th>
                <th>ETH Split</th>
                <th>LTC Split</th>
              </tr>
            </thead>
            <tbody>
              {list && !!list.length && (
                list.map(instruction => (
                  <tr key={instruction.id}>
                    <td>
                      <strong>{`${instruction.created_at.split("T", 1)}`}</strong>
                    </td>
                    <td>
                      <strong>{`${instruction.amount}`}</strong>
                    </td>
                    <td>
                      {`${instruction.BTC_split}`}
                    </td>
                    <td>
                      {`${instruction.ETH_split}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* A convenience button to refetch on demand */}
          <button onClick={this.fetchInstructions}>Refetch Instructions!</button>
        </div>
      </div>
    )
  }
}

// Pull in both the Client and the Instructions state
const mapStateToProps = state => ({
  client: state.client,
  instructions: state.instructions,
})

// Make the Client and instructions available in the props as well
// as the instructionCreate() function
const connected = connect(mapStateToProps, { instructionCreate, instructionRequest })(Instructions)
const formed = reduxForm({
  form: 'instructions',
})(connected)

export default formed
