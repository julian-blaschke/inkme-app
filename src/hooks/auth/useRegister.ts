import {useState} from "react"
import {auth} from "../../../firebase"

export const useSignUpWithEmailAndPassword = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>()
  type RegisterProps = {email: string; username: string; password: string}

  const signUp = async ({email, username, password}: RegisterProps) => {
    setError("")
    setIsLoading(true)
    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      //username will be stored as `displayname`
      await user?.updateProfile({displayName: username})
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signUp, isLoading, error}
}
