import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { renderRoutes } from 'react-router-config';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import routes from '../../routes';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AppBar position="static" className="main-menu">
            <Toolbar className="menu">
              <Link to="/" className="flex-grow-ten">
                <Typography variant="h6">
                  Comité Deportivo de Santa Ana
                </Typography>
              </Link>
              <Link to="/login" className="flex-grow-one">
                <Button color="inherit">Iniciar Sesión</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Container className="default-margins">
            {renderRoutes(routes)}
          </Container>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            pauseOnHover
          />
        </Router>
      </div>
    );
  }
}

export default App;
