import * as React from "react"
import {TouchableOpacity} from "react-native-gesture-handler"
import {Text, Image, TouchableOpacityProps} from "react-native"
import * as AppleAuthentication from "expo-apple-authentication"
import tailwind from "tailwind-rn"
import {AntDesign} from "@expo/vector-icons"
import {useSignInWithGoogle, useSignInWithApple} from "../hooks/auth/useSignIn"
import {ErrorLabel} from "./Label"

/**
 * alternative to react-native`s button component
 *
 * @param {TouchableOpacityProps} {props} to pass down to the TouchableOpacity
 * @returns button as TouchableOpacity component
 *
 */
export const Button: React.FC<TouchableOpacityProps> = props => {
  let {style, ...rest} = props
  return (
    <TouchableOpacity
      style={Object.assign(
        tailwind(
          "h-10 my-1 flex flex-row justify-center items-center bg-white rounded-md"
        ),
        style
      )}
      {...rest}>
      {props.children}
    </TouchableOpacity>
  )
}

/**
 * button to sign into firebase with Google OAuth
 *
 * @param {TouchableOpacityProps} {props} to pass down to the TouchableOpacity
 * @returns button with Google-icon as TouchableOpacity component
 */
export const SignInWithGoogleButton: React.FC<TouchableOpacityProps> = props => {
  const {signInWithGoogle, isLoading, error} = useSignInWithGoogle()
  return (
    <>
      <Button disabled={isLoading} onPress={signInWithGoogle} {...props}>
        <AntDesign name="google" size={14} style={tailwind("mr-1")}></AntDesign>
        <Text style={tailwind("font-medium")}>Sign In With Google</Text>
      </Button>
      <ErrorLabel>{error}</ErrorLabel>
    </>
  )
}

/**
 * Button to sign into firebase authentication with apple provider
 *
 * @returns button with Apple-icon as TouchableOpacity component
 */
export const SignInWithAppleButton: React.FC = () => {
  const {signInWithApple, isLoading, error} = useSignInWithApple()
  return (
    <>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        onPress={signInWithApple}
        style={tailwind(
          "h-10 w-full my-1"
        )}></AppleAuthentication.AppleAuthenticationButton>
      <ErrorLabel>{error}</ErrorLabel>
    </>
  )
}
