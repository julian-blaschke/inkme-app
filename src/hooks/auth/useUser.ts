import {useState} from "react"
import firebase from "../../../firebase"

export default () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  firebase.auth().onAuthStateChanged(user => setUser(user))
  return user
}
