import React, { useEffect, useState } from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, composeValidators, isRequired } from 'revalidate'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import { fetchCurso, addCurso, updateCurso } from '../../app/store/actions/cursoActions'
import ErrorMessage from '../form/ErrorMessage'

const validate = combineValidators({
  nombre: composeValidators(isRequired({ message: 'El nombre es requerido' }))(),
  sigla: composeValidators(isRequired({ message: 'La sigla es requerida' }))(),
})

const actions = {
  fetchCurso,
  addCurso,
  updateCurso,
}

const mapState = (state) => ({
  curso: state.curso.curso,
  loading: state.curso.loadingCurso,
})

const CursosForm = ({ id, curso, fetchCurso, loading, addCurso, updateCurso }) => {
  const [actionLabel, setActionLabel] = useState('Add Curso')
  const [labelButton, setLabelButton] = useState('')

  useEffect(() => {
    if (id) {
      fetchCurso(id)
      setActionLabel('EDITAR CURSO')
      setLabelButton('MODIFICAR')
    } else {
      setActionLabel('AGREGAR CURSO')
      setLabelButton('GUARDAR')
    }
  }, [fetchCurso, id])

  const handleCreateorEdit = (values) => {
    if (id) {
      updateCurso(values)
    } else {
      const newCurso = {
        nombre: values.nombre,
        sigla: values.sigla,
        estado: true,
      }
      addCurso(newCurso)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleCreateorEdit(values)}
      initialValues={id && curso}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading}>
          <Header as="h4" content={actionLabel} color="black" textAlign="center" />
          <Field name="nombre" component={TextInput} placeholder="Escribe el nombre" />
          <Field name="sigla" component={TextInput} placeholder="Escribe la sigla" />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid values" />}
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

CursosForm.propTypes = {
  id: PropTypes.string,
  curso: PropTypes.object,
  fetchCurso: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  addCurso: PropTypes.func.isRequired,
  updateCurso: PropTypes.func.isRequired,
}

CursosForm.defaultProps = {
  id: null,
  curso: null,
}

export default connect(mapState, actions)(CursosForm)
