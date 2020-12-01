import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Breadcrumb, Button, Container, Divider, Grid, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import MatriculaService from '../../app/api/matriculaService';
import LoadingComponent from '../../components/common/LoadingComponent';

const Matriculas = ({ history }) => {
  const [matriculas, setMatriculas] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMatriculas = useCallback(async () => {
    setLoading(true)
    try {
      const matriculas = await MatriculaService.fetchMatriculas()
      if (matriculas) {
        setMatriculas(matriculas)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
    }
  }, [])

  useEffect(() => {
    fetchMatriculas()
  }, [fetchMatriculas])

  let matriculasList = <h4>There is no registered matriculas</h4>

  if (matriculas && matriculas.length > 0) {
    matriculasList = (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="12" textAlign="center">CODIGO</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">FEC. MAT.</Table.HeaderCell>
            <Table.HeaderCell width="2" textAlign="center">ACCIÓN</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            matriculas.map((matricula) => {
              return (
                <Table.Row key={matricula.id}>
                  <Table.Cell textAlign="left">{matricula.id}</Table.Cell>
                  <Table.Cell textAlign="center">{new Date(matricula.fecMat).toLocaleDateString()}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Popup
                      inverted
                      content="Detalle de Matrícula"
                      trigger={
                        <Button
                          color="violet"
                          icon="address card outline"
                          onClick={() => {
                            history.push(`/matricula/${matricula.id}`)
                          }}
                        />
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    )
  }

  if (loading) return <LoadingComponent content="Loading Matriculas..." />

  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Matricula List</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="list alternate outline" />
          Matriculas
        </Header>
      </Divider>
      <Container>
        <Grid>
          <Grid.Column width="1" />
          <Grid.Column width="14">{matriculasList}</Grid.Column>
          <Grid.Column width="1" />
        </Grid>
      </Container>
    </Segment>
  )
}

Matriculas.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Matriculas
