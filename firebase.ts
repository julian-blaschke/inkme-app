import * as firebase from "firebase"
import config from "./firebase.config"

firebase.initializeApp(config)

export default firebase
export const auth = firebase.auth()
