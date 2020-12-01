import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react'

import EstudianteService from '../../app/api/estudianteService'
import CursoService from '../../app/api/cursoService'
import MatriculaService from '../../app/api/matriculaService'
import LoadingComponent from '../../components/common/LoadingComponent'
import { Link } from 'react-router-dom'

const MatriculaDetails = ({ match }) => {
  const [matricula, setMatricula] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchMatricula = useCallback(async () => {
    setLoading(true)
    try {
      const matricula = await MatriculaService.fetchMatricula(match.params.id)
      if (matricula) {
        const estudiante = await EstudianteService.fetchEstudiante(matricula.estudiante.id)
        const items = []
        if (matricula.cursos.length > 0) {
          matricula.cursos.forEach((item) => {
            CursoService.fetchCurso(item.id)
              .then((response) => {
                if (response) {
                  const cursoItem = {
                    nombre: response.nombre,
                    id: response.id
                  }
                  items.push(cursoItem)
                }

                const matriculaDetail = {
                  id: matricula.id,
                  estudiante,
                  items,
                  createdAt: new Date(matricula.fecMat).toLocaleDateString(),
                }
                setMatricula(matriculaDetail)
              })
              .catch((error) => toast.error(error))
          })
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }, [match.params.id])

  useEffect(() => {
    fetchMatricula()
  }, [fetchMatricula])

  if (loading) return <LoadingComponent content="Loading Matricula Details..." />
  let matriculaDetailedArea = <h4>Matricula Details</h4>

  if (matricula) {
    matriculaDetailedArea = (
      <Segment.Group>
        <Segment>
          <Header as="h4" block color="black">
            Matricula
            </Header>

          <p>
            <strong>Código: </strong>
            {matricula.id}
          </p>
          <p>
            <strong>Fecha: </strong>
            {matricula.createdAt}
          </p>
        </Segment>
        <Segment>
          <Header as="h4" block color="black">
            Estudiante
          </Header>

          <p>
            <strong>Nombre: </strong>
            {`${matricula.estudiante.nombres} ${matricula.estudiante.apellidos}`}
          </p>
        </Segment>

        <Segment>
          <Header as="h4" block color="black">
            {matricula.items.length > 1 ? 'Cursos' : 'Curso'}
          </Header>

          <Table celled striped>
            <Table.Body>
              {
                matricula.items.length > 0 &&
                matricula.items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="left">{item.nombre}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    )
  }

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/matriculas">
          Listado de Matriculas
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Detalle de Matricula</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="address card outline" />
          Detalle de Matricula
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="3" />
          <Grid.Column width="10">{matriculaDetailedArea}</Grid.Column>
          <Grid.Column width="3" />
        </Grid>
      </Container>
    </Segment>
  )
}

MatriculaDetails.propTypes = {
  match: PropTypes.object.isRequired,
}

export default MatriculaDetails
