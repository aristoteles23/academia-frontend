import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import NotFound from '../../components/common/NotFound'
import Navbar from '../../components/navbar/Navbar'
import HomePage from '../../pages/home/HomePage'
import Cursos from '../../pages/cursos/Cursos'
import Estudiantes from '../../pages/estudiantes/Estudiantes'
import Matriculas from '../../pages/matriculas/Matriculas'
import MatriculaDetails from '../../pages/matriculas/MatriculaDetails'
import Matricula from '../../pages/matriculas/Matricula'

const Routes = ({ authenticated }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      {authenticated && (
        <Route
          path="/(.+)"
          render={() => (
            <>
              <Navbar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route exact path="/" component={HomePage} />

                  <Route path="/cursos" component={Cursos} />
                  <Route path="/estudiantes" component={Estudiantes} />

                  <Route path="/matriculaAdd" component={Matricula} />
                  <Route path="/matricula/:id" component={MatriculaDetails} />
                  <Route path="/matriculas" component={Matriculas} />

                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      )}
    </>
  )
}

Routes.propTypes = {
  authenticated: PropTypes.bool,
}

Routes.defaultProps = {
  authenticated: false,
}

export default withRouter(Routes)
