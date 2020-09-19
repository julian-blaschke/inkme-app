import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import {firebaseConfig} from "./firebase.config"

app.initializeApp(firebaseConfig)

export default app
export const auth = app.auth()
export const firestore = app.firestore()
export const storage = app.storage()
