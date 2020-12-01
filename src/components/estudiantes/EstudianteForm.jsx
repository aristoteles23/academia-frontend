import React, { useEffect, useState } from 'react'
import { combineValidators, isRequired } from 'revalidate'
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import useFetchEstudiante from '../../app/hooks/useFetchEstudiante'
import ErrorMessage from '../form/ErrorMessage'
import TextInput from '../form/TextInput'

const validate = combineValidators({
  nombres: isRequired({ message: 'Los nombres son requeridos.' }),
  apellidos: isRequired({ message: 'Los apellidos son requeridos.' }),
  dni: isRequired({ message: 'El DNI es requerido.' }),
  edad: isRequired({ message: 'La edad es requerida.' })
})

const EstudianteForm = ({ estudianteId, submitHandler }) => {
  const [actionLabel, setActionLabel] = useState('Add Estudiante')
  const [labelButton, setLabelButton] = useState('')

  // Custom hook
  const [estudiante, loading] = useFetchEstudiante(estudianteId)

  useEffect(() => {
    if (estudianteId) {
      setActionLabel('EDITAR ESTUDIANTE')
      setLabelButton('MODIFICAR')
    } else {
      setActionLabel('AGREGAR CURSO')
      setLabelButton('GUARDAR')
    }
  }, [estudianteId])

  return (
    <FinalForm
      onSubmit={(values) => submitHandler(values)}
      initialValues={estudianteId && estudiante}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h4" content={actionLabel} color="black" textAlign="center" />
          <Field name="nombres" component={TextInput} placeholder="Escriba los nombres" />
          <Field name="apellidos" component={TextInput} placeholder="Escriba los apellidos" />
          <Field name="dni" component={TextInput} placeholder="Escriba el DNI" />
          <Field name="edad" component={TextInput} type="number" placeholder="Escriba la edad" />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text="Invalid username or password" />
          )}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="green"
            content={labelButton}
          />
        </Form>
      )}
    />
  )
}

EstudianteForm.propTypes = {
  estudianteId: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
}

EstudianteForm.defaultProps = {
  estudianteId: null,
}

export default EstudianteForm
