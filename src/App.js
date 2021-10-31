import Layout from './Layout/Layout'
import './App.css'
import AddTouristPlace from './pages/AddTouristPlace'
import Home from './pages/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import GetAllTouristPlace from './pages/GetAllTouristPlace'
import EditTouristPlace from './pages/EditTouristPlace'
// import PrivateRoute from './PrivateRoute/PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/home' component={Home} exact />
            <Route path='/addTouristPlace' component={AddTouristPlace} exact />
            <Route
              path='/getAllTouristPlace'
              component={GetAllTouristPlace}
              exact
            />
            <Route
              path='/getAllTouristPlace/:id/edit'
              component={EditTouristPlace}
              exact
            />
            <Route path='/login' component={Login} exact />'
            <Route path='/signup' component={SignUp} exact />'
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App
