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

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {/*
        If the form has been touched AND is in error, show `error`.
        `error` is the message returned from our validate function above
        which in this case is `Name Required`.

        `touched` is a live updating property that RF passes in.  It tracks
        whether or not a field has been "touched" by a user.  This means
        focused at least once.
      */}
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )

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
            <label htmlFor="description">Split</label>
            <Field
              name="description"
              type="text"
              id="description"
              className="description"
              component="input"
            />
            <label htmlFor="size">Amount</label>
            <Field
              name="size"
              type="number"
              id="size"
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
                <th>Split</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {list && !!list.length && (
                list.map(instruction => (
                  <tr key={instruction.id}>
                    <td>
                      <strong>{`${instruction.name}`}</strong>
                    </td>
                    <td>
                      {`${instruction.description}`}
                    </td>
                    <td>
                      {`${instruction.size}`}
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
