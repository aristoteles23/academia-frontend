import React, { useEffect, useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { Button, Form, Grid, Header, Popup, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import history from '../..'
import ErrorMessage from '../form/ErrorMessage'
import SelectedInput from '../form/SelectedInput'

import { fetchCursos } from '../../app/store/actions/cursoActions'
import MatriculaService from '../../app/api/matriculaService'
import useFetchEstudiantes from '../../app/hooks/useFetchEstudiantes'

const validate = combineValidators({
  //descripcion: isRequired({ message: 'The description is required' }),
  estudiante: isRequired(''),
  curso: isRequired(''),
})

const actions = {
  fetchCursos,
}

const mapState = (state) => {
  const cursos = []

  if (state.curso.cursos && state.curso.cursos.length > 0) {
    state.curso.cursos.forEach((item) => {
      const curso = {
        key: item.id,
        text: item.nombre,
        value: item.id,
      }
      cursos.push(curso)
    })
  }

  return {
    loading: state.curso.loadingCursos,
    cursos,
  }
}

const MatriculaForm = ({ fetchCursos, cursos, loading }) => {
  const [estudiantes] = useFetchEstudiantes()
  const [estudiantesList, setEstudiantesList] = useState([])
  const [loadingEstudiantes, setLoadingEstudiantes] = useState(true)
  const [items, setItems] = useState([])
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (cursos.length === 0) {
      fetchCursos()
    }
    setLoadingEstudiantes(true)
    if (estudiantes) {
      const estudiantesList = []
      estudiantes.forEach((item) => {
        const estudiante = {
          key: item.id,
          text: `${item.nombres} ${item.apellidos}`,
          value: item.id,
        }
        estudiantesList.push(estudiante)
      })
      setEstudiantesList(estudiantesList)
      setLoadingEstudiantes(false)
    }
  }, [estudiantes, cursos.length, fetchCursos])

  const handleAddingItems = () => {
    const newItems = [...items]
    const cursosList = [...cursos]
    const index = newItems.findIndex((a) => a.id === item)
    const cursoEnLista = newItems.find(cur => cur.id === item);
    if (typeof cursoEnLista !== 'object') {
      if (index > -1) {
        newItems[index] = {
          id: newItems[index].id,
          nombre: newItems[index].nombre
        }
        setItems(newItems)
      } else {
        const newItem = {
          id: item,
          nombre: cursosList.filter((a) => a.key === item)[0].text
        }
        newItems.push(newItem)
      }
      setItems(newItems)
    } else {
      toast.warning('¡El curso ya se encuentra cargado!')
    }
  }

  const handleRemoveItems = (id) => {
    let updatedItems = [...items]
    updatedItems = updatedItems.filter((a) => a.id !== id)
    setItems(updatedItems)
  }

  const handleAddNewMatricula = async (values) => {
    const newItems = [...items]
    const itemsForMatricula = newItems.map((item) => {
      return { id: item.id }
    })
    const newMatricula = {
      estudiante: {
        id: values.estudiante,
      },
      cursos: itemsForMatricula,
      estado: true
    }

    try {
      let matricula = await MatriculaService.addMatricula(newMatricula)
      toast.success('¡La matricula fue creada satisfactoriamente!')
      history.push(`matricula/${matricula.id}`)
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <FinalForm
      onSubmit={(values) => handleAddNewMatricula(values)}
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error loading={loading || loadingEstudiantes}>
          <Header as="h3" content="Agregar Nueva Matricula" color="black" textAlign="center" />
          <Grid textAlign="center">
            <Grid.Row>
              <Grid.Column width="12">
                <Field
                  name="estudiante"
                  component={SelectedInput}
                  placeholder="-- SELECCIONE UN ESTUDIANTE --"
                  options={estudiantesList}
                  width="16"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid textAlign="center">
            <Grid.Row>
              <Grid.Column width="10">
                <Field
                  name="curso"
                  component={SelectedInput}
                  placeholder="-- SELECCIONE UN CURSO --"
                  options={cursos}
                  width="16"
                  handleOnChange={(e) => setItem(e)}
                />
              </Grid.Column>
              <Grid.Column width="2">
                <Popup
                  inverted
                  content="Add Dish To Matricula"
                  trigger={
                    <Button
                      type="button"
                      loading={submitting}
                      color="green"
                      icon="plus circle"
                      onClick={handleAddingItems}
                      disabled={!item}
                    />
                  }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="12">
                {items && items.length > 0 && (
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell textAlign="center">CURSO</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">ACCIÓN</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {items.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell textAlign="center">{item.nombre}</Table.Cell>
                          <Table.Cell textAlign="center">
                            <Popup
                              inverted
                              content="ELIMINAR"
                              trigger={
                                <Button
                                  color="red"
                                  icon="trash"
                                  type="button"
                                  onClick={() => handleRemoveItems(item.id)}
                                />
                              }
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </Grid.Column>

            </Grid.Row>
          </Grid>
          <br />
          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text="Invalid Values" />}
          <Button
            fluid
            disabled={(invalid && !dirtySinceLastSubmit) || pristine || items.length === 0}
            loading={submitting}
            color="green"
            content="GUARDAR"
          />
        </Form>
      )}
    />
  )
}

MatriculaForm.propTypes = {
  fetchCursos: PropTypes.func.isRequired,
  cursos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapState, actions)(MatriculaForm)
