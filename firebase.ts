import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import config from "./firebase.config"

app.initializeApp(config)

export default app
export const auth = app.auth()
export const firestore = app.firestore()
