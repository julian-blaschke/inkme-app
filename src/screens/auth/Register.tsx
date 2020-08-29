import * as React from "react"
import tailwind from "tailwind-rn"
import {View, Text, KeyboardAvoidingView, Platform} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {useForm} from "react-hook-form"
import {AuthNavProps} from "../../navigation/AuthNavigator"
import {ControlledInput} from "../../components/ControlledInput"
import {emailRules, usernameRules, passwordRules} from "../../validation/rules"
import {Label, ErrorLabel} from "../../components/Label"
import {Button, SocialMediaButtons} from "../../components/Button"
import {useSignUpWithEmailAndPassword} from "../../hooks/auth/useRegister"
import {useSignInWithGoogle} from "../../hooks/auth/useSignIn"

type FormData = {
  email: string
  username: string
  password: string
}

const defaultValues: FormData = {email: "", username: "", password: ""}

/**
 * screen to register with either email, username & password or
 * 3rd party services like Google, Facebook or Apple
 *
 * @param {AuthNavProps<"register">} {navigation} auth stack navigator
 * @returns `register` screen
 */
export default ({navigation}: AuthNavProps<"login">) => {
  const {control, handleSubmit, errors} = useForm<FormData>({defaultValues})
  const {signUp, isLoading, error} = useSignUpWithEmailAndPassword()
  const {signInWithGoogle, error: googleError} = useSignInWithGoogle()

  return (
    <SafeAreaView style={tailwind("h-full w-full")}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={tailwind("py-4 px-4")}>
        <Text style={tailwind("text-4xl font-semibold")}>Sign Up</Text>
        <View style={tailwind("pt-10")}>
          <View>
            <Label>Email</Label>
            <ControlledInput
              name="email"
              control={control}
              rules={emailRules}
              placeholder="post@malone.com"></ControlledInput>
            <ErrorLabel>{errors.email?.message}</ErrorLabel>
          </View>
          <View>
            <Label>Username</Label>
            <ControlledInput
              name="username"
              control={control}
              rules={usernameRules}
              placeholder="post-malone"></ControlledInput>
            <ErrorLabel>{errors.username?.message}</ErrorLabel>
          </View>
          <View>
            <Label>Password</Label>
            <ControlledInput
              name="password"
              control={control}
              rules={passwordRules}
              placeholder="malone1234"></ControlledInput>
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          </View>
          <Button
            onPress={handleSubmit(signUp)}
            disabled={isLoading}
            style={tailwind("bg-pink-500 mb-4")}>
            Sign Up
          </Button>
          <ErrorLabel>{error}</ErrorLabel>
          <LoginLink navigation={navigation}></LoginLink>
          <SocialMediaButtons
            onPressGoogle={signInWithGoogle}
            title="or Sign Up with"></SocialMediaButtons>
          <View style={tailwind("mt-4")}>
            <ErrorLabel>{googleError}</ErrorLabel>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const LoginLink: React.FC<Partial<AuthNavProps<"login">>> = ({navigation}) => (
  <View>
    <Text style={tailwind("pt-2 text-center text-gray-500")}>
      Already have an account?{" "}
      <Text
        onPress={() => navigation?.navigate("login")}
        style={tailwind("underline text-gray-900")}>
        Sign in
      </Text>
    </Text>
  </View>
)
