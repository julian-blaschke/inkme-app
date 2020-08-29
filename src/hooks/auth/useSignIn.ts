import {useState} from "react"
import * as Google from "expo-google-app-auth"
import firebase, {auth} from "../../../firebase"
import {iosClientId} from "../../../firebase.config"

export const useSignInWithEmailAndPassword = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  type SignInProps = {email: string; password: string}

  const signIn = async ({email, password}: SignInProps) => {
    setError("")
    setIsLoading(true)
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signIn, error, isLoading}
}

export const useSignInWithGoogle = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError("")
    try {
      const result = await Google.logInAsync({
        iosClientId,
        scopes: ["profile", "email"],
      })
      if (result.type == "success") {
        const {idToken, accessToken} = result
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        )
        auth.signInWithCredential(credential)
      } else {
        setError("Authentication has been cancelled")
      }
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signInWithGoogle, isLoading, error}
}
