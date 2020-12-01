import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { FORM_ERROR } from 'final-form'
import { Form, Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import TextInput from '../form/TextInput'
import ErrorMessage from '../form/ErrorMessage'
import { login } from '../../app/store/actions/authActions'

const validate = combineValidators({
  username: isRequired('username'),
  password: isRequired('password'),
})

const actions = {
  login,
}

const LoginForm = ({ login }) => {
  return (
    <FinalForm
      onSubmit={(values) => login(values).catch((error) => ({ [FORM_ERROR]: error }))}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" content="Acceso a Feynman" color="pink" textAlign="center" />
          <Field name="username" component={TextInput} placeholder="Escribe tu usuario" />
          <Field name="password" component={TextInput} placeholder="Escribe tu contraseña" type="password" />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text="Usuario o contraseña incorrectas." />
          )}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="violet"
            content="ENTRAR"
          />
        </Form>
      )}
    />
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(null, actions)(LoginForm)
// export default LoginForm
