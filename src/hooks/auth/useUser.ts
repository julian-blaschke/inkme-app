import {useState, useEffect} from "react"
import firebase from "../../../firebase"

/**
 * subscribe to the onAuthStateChanged firebase observable,
 * to check if there is a user logged in & to get this users information
 *
 * @returns the currently logged in user
 */
export default () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => setUser(user))
    return () => unsubscribe()
  }, [])
  return user
}
