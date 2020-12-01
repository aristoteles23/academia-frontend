import React, { useEffect } from 'react'
import { Segment, Breadcrumb, Table, Divider, Header, Icon, Popup, Button, Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCursos, deleteCurso } from '../../app/store/actions/cursoActions'
import { openModal } from '../../app/store/actions/modalActions'
import LoadingComponent from '../../components/common/LoadingComponent'
import CursosForm from '../../components/cursos/CursosForm'

const actions = {
  fetchCursos,
  openModal,
  deleteCurso,
}

const mapState = (state) => ({
  cursos: state.curso.cursos,
  loading: state.curso.loadingCursos,
  loadingCurso: state.curso.loadingCurso,
})

const Cursos = ({ fetchCursos, cursos, openModal, loading, loadingCurso, deleteCurso }) => {
  useEffect(() => {
    fetchCursos()
  }, [fetchCursos])

  let cursoList = <h4>There are no cursos on the store</h4>

  if (cursos && cursos.length > 0) {
    cursoList = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="5" textAlign="center">NOMBRE</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">SIGLA</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">ACCIÓN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cursos.map((curso) => (
            <Table.Row key={curso.id}>
              <Table.Cell textAlign="left">
                {curso.nombre}
              </Table.Cell>
              <Table.Cell textAlign="left">
                {curso.sigla}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Popup
                  inverted
                  content="MODIFICAR"
                  trigger={
                    <Button
                      color="yellow"
                      icon="edit"
                      loading={loadingCurso}
                      onClick={() => {
                        openModal(<CursosForm id={curso.id} />)
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
                      loading={loadingCurso}
                      onClick={() => {
                        deleteCurso(curso.id)
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

  if (loading) return <LoadingComponent content="Loading Cursos..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Recursos</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Cursos</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Lista de Cursos
        </Header>
      </Divider>
      <Segment textAlign="center">
        <Button
          size="large"
          content="Agregar Curso"
          icon="add"
          color="green"
          onClick={() => {
            openModal(<CursosForm />)
          }}
        />
      </Segment>
      <Container>
        <Grid.Column columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{cursoList}</Grid.Column>
          <Grid.Column width="3" />
        </Grid.Column>
      </Container>
    </Segment>
  )
}

Cursos.propTypes = {
  fetchCursos: PropTypes.func.isRequired,
  cursos: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingCurso: PropTypes.bool.isRequired,
  deleteCurso: PropTypes.func.isRequired,
}

export default connect(mapState, actions)(Cursos)
