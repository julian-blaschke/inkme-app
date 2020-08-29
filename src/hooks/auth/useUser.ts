import {useState, useEffect} from "react"
import {auth} from "../../../firebase"

/**
 * subscribe to the onAuthStateChanged firebase observable,
 * to check if there is a user logged in & to get this users information
 *
 * @returns the currently logged in user
 */
export default () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  //auth.signOut()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setUser(user))
    return () => unsubscribe()
  }, [])
  return user
}
