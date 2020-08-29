import {useState} from "react"
import {auth} from "../../../firebase"

/**
 * provides functionality to sign a user into firebase authentication
 * with an email, username and password
 *
 * @returns sign-up callable, error (if there occured one), status
 */
export const useSignUpWithEmailAndPassword = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>()
  type RegisterProps = {email: string; username: string; password: string}

  /**
   * callable to sign up a user to firebase authentication with
   * email and password
   *
   * @param email email of user to sign in (must be unique in firebase)
   * @param username username of user to sign in (must be unique in firebase)
   * @param password password of user to sign in
   */
  const signUp = async ({email, username, password}: RegisterProps) => {
    setError("")
    setIsLoading(true)
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      //username will be stored as `displayname` in firebase
      await user?.updateProfile({displayName: username})
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signUp, isLoading, error}
}
