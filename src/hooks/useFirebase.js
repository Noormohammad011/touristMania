import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

import initializeAuthentication from '../Firebase/firebase.init'
import { useHistory, useLocation } from 'react-router-dom'
//initialize firebase  authentication
initializeAuthentication()

const useFirebase = () => {
  const location = useLocation()
  const history = useHistory()
  const redirect_url = location.state?.from || '/'
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const auth = getAuth()
  //on State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const createAccountWithGoogle = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const updateName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        const newUser = { ...user, displayName: name } // recommend
        setUser(newUser)

        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  }
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
        history.push(redirect_url)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // sign out

  return {
    user,
    setUser,
    createAccountWithGoogle,
    loginWithEmailAndPassword,
    isLoading,
    setIsLoading,
    logOut,
    updateName,
  }
}

export default useFirebase
