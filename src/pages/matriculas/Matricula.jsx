import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import MatriculaForm from '../../components/matriculas/MatriculaForm'

const Matricula = () => {
  return (
    <Segment>
      <Breadcrumb size="small">
        <Breadcrumb.Section>Matricula</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section as={Link} to="/matriculas">
          Listado de Matriculas
        </Breadcrumb.Section> 
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Nueva Matricula</Breadcrumb.Section>
      </Breadcrumb>
      <Divider horizontal>  
        <Header as="h4">
          <Icon name="address card outline" />
          Detalle de Matrícula
        </Header>
      </Divider>
      <Container>
        <Grid columns="3">
          <Grid.Column width="2" />
          <Grid.Column width="12">
            <MatriculaForm />
          </Grid.Column>
          <Grid.Column width="2" />
        </Grid>
      </Container>
    </Segment>
  )
}

export default Matricula
