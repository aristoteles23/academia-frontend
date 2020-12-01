import React, { useEffect, useState } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'
import { openModal, closeModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import EstudianteForm from '../../components/estudiantes/EstudianteForm'
import EstudianteService from '../../app/api/estudianteService'
import useFetchEstudiantes from '../../app/hooks/useFetchEstudiantes'

const actions = {
  openModal,
  closeModal,
}

const Estudiantes = ({ openModal, closeModal }) => {
  const [estudiantesList, setEstudiantesList] = useState([])
  const [loadingAction, setLoadingAction] = useState(false)
  const [loading, setLoading] = useState(true)

  const [estudiantes] = useFetchEstudiantes()

  useEffect(() => {
    setLoading(true)
    if (estudiantes) {
      setEstudiantesList(estudiantes)
      setLoading(false)
    }
  }, [estudiantes])

  const handleCreateorEdit = async (values) => {
    const estudiantesUpdatedList = [...estudiantesList]
    try {
      if (values.id) {
        const updatedEstudiante = await EstudianteService.updateEstudiante(values)
        const index = estudiantesUpdatedList.findIndex((a) => a.id === values.id)
        estudiantesUpdatedList[index] = updatedEstudiante
        toast.success('¡El estudiante fue modificado satisfactoriamente!')
      } else {
        const estudiante = {
          nombres: values.nombres,
          apellidos: values.apellidos,
          dni: values.dni,
          edad: values.edad
        }
        const newEstudiante = await EstudianteService.addEstudiante(estudiante)
        estudiantesUpdatedList.push(newEstudiante)
        toast.success('¡El estudiante fue creado satisfactoriamente!')
      }
      setEstudiantesList(estudiantesUpdatedList)
    } catch (error) {
      toast.error(error)
    }
    closeModal()
  }

  const handleDeleteEstudiante = async (id) => {
    setLoadingAction(true)
    try {
      let estudiantesUpdatedList = [...estudiantesList]
      await EstudianteService.deleteEstudiante(id)
      estudiantesUpdatedList = estudiantesUpdatedList.filter((a) => a.id !== id)
      setEstudiantesList(estudiantesUpdatedList)
      setLoadingAction(false)
      toast.success('¡El estudiante fue eliminado satisfactoriamente!')
    } catch (error) {
      setLoadingAction(false)
      toast.error(error)
    }
  }

  let estudiantesArea = <h4>No existen categorias asociadas</h4>
  if (estudiantesList && estudiantesList.length > 0) {
    estudiantesArea = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5" textAlign="center">NOMBRES</Table.HeaderCell>
            <Table.HeaderCell width="5" textAlign="center">APELLIDOS</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">DNI</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">EDAD</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">ACCIÓN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {estudiantesList.map((estudiante) => (
            <Table.Row key={estudiante.id}>
              <Table.Cell textAlign="left">{estudiante.nombres}</Table.Cell>
              <Table.Cell textAlign="left">{estudiante.apellidos}</Table.Cell>
              <Table.Cell textAlign="center">{estudiante.dni}</Table.Cell>
              <Table.Cell textAlign="center">{estudiante.edad}</Table.Cell>
              <Table.Cell textAlign="center">
                <Popup
                  inverted
                  content="MODIFICAR"
                  trigger={
                    <Button
                      color="yellow"
                      icon="edit"
                      loading={loadingAction}
                      onClick={() => {
                        openModal(<EstudianteForm estudianteId={estudiante.id} submitHandler={handleCreateorEdit} />)
                      }}
                    />
                  }
                />
                <Popup
                  inverted
                  content="ELIMINAR"
                  trigger={
                    <Button
                      color="red"
                      icon="trash"
                      loading={loadingAction}
                      onClick={() => {
                        handleDeleteEstudiante(estudiante.id)
                      }}
                    />
                  }
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }

  if (loading) return <LoadingComponent content="Cargando Estudiantes..." />

  return (
    <>
      <Segment>
        <Breadcrumb size="small">
          <Breadcrumb.Section>Recursos</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section active>Estudiantes</Breadcrumb.Section>
        </Breadcrumb>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="list alternate outline" />
            Lista de Estudiantes
          </Header>
        </Divider>
        <Segment textAlign="center">
          <Button
            size="large"
            content="Agregar Estudiante"
            icon="add user"
            color="green"
            onClick={() => {
              openModal(<EstudianteForm submitHandler={handleCreateorEdit} />)
            }}
          />
        </Segment>
        <Container textAlign="center">
          <Grid columns="5">
            <Grid.Column width="16">{estudiantesArea}</Grid.Column>
          </Grid>
        </Container>
      </Segment>
    </>
  )
}

Estudiantes.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(null, actions)(Estudiantes)
