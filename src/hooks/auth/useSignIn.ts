import {useState} from "react"
import * as Google from "expo-google-app-auth"
import * as AppleAuthentication from "expo-apple-authentication"
import firebase, {auth} from "../../../firebase"
import {iosClientId, androidClientId} from "../../../firebase.config"

/**
 * provides functionality to sign in a user into firebase authentication
 * with email and password
 *
 * @returns sign-in callable, error (if there is one), status
 */
export const useSignInWithEmailAndPassword = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  type SignInProps = {email: string; password: string}

  /**
   * callable to sign in a user into firebase authentication with
   * email and password
   *
   * @param email email of user to sign in
   * @param password password of user to sign in
   */
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

/**
 * provides functionality to sign in a user into firebase authentication
 * with Google provider
 *
 * @returns sign-in callable, error (if there is one), status
 */
export const useSignInWithGoogle = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * sign in callable to sign in a user into firebase authentication with
   * Google provider - works with Google OAuth API (browser pop-up) to retrieve
   * credentials, then signs into firebase authentication
   *
   */
  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError("")
    try {
      //open pop-up and sign in user with Google API OAuth
      const result = await Google.logInAsync({
        iosClientId,
        androidClientId,
        //TODO: add androidClientId here
        scopes: ["profile", "email"],
      })
      if (result.type == "success") {
        const {idToken, accessToken} = result
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        )
        //then sign user into firebase
        await auth.signInWithCredential(credential)
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

/**
 * provides functionality to sign in a user into firebase authentication
 * with Apple
 *
 * @returns sign-in callable, error (if there is one), status
 */
export const useSignInWithApple = () => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * sign in callable to sign in a user into firebase authentication with
   * Google provider - works with Google OAuth API (browser pop-up) to retrieve
   * credentials, then signs into firebase authentication
   *
   */
  const signInWithApple = async () => {
    setIsLoading(true)
    setError("")
    try {
      const {identityToken} = await AppleAuthentication.signInAsync({
        requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
      })
      const provider = new firebase.auth.OAuthProvider("apple.com")
      if (identityToken) {
        const credential = provider.credential({idToken: identityToken})
        await auth.signInWithCredential(credential)
      } else {
        setError("Sign in unsuccessful. Please try again.")
      }
    } catch ({message}) {
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }
  return {signInWithApple, isLoading, error}
}
