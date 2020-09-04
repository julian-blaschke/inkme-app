import {useState} from "react"
import {auth, firestore} from "../../../firebase"

/**
 * provides functionality to sign a user into firebase authentication
 * with an email, username and password
 *
 * @returns sign-up callable, error (if there occured one), status
 */
export const useSignUpWithEmailAndPassword = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>()
  type SignUpProps = {email: string; password: string}

  /**
   * callable to sign up a user to firebase authenti  cation with
   * email and password
   *
   * @param email email of user to sign in (must be unique in firebase)
   * @param username username of user to sign in (must be unique in firebase)
   * @param password password of user to sign in
   */
  const signUp = async ({email, password}: SignUpProps) => {
    setError("")
    setIsLoading(true)
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async ({user}) => {
          if (user) {
            let {uid} = user
            await firestore.collection("users").doc(uid.toString()).set({})
          }
        })
        .catch(err => setError(err))
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signUp, isLoading, error}
}
