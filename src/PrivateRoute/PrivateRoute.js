import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loader from '../components/Loader'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
          user.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            ></Redirect>
          )
        }
      ></Route>
    </div>
  )
}

export default PrivateRoute
