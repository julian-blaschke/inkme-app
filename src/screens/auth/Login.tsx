import * as React from "react"
import tailwind from "tailwind-rn"
import {View, Text, KeyboardAvoidingView, Platform} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {useForm} from "react-hook-form"
import {AuthNavProps} from "../../navigation/AuthNavigator"
import {ControlledInput} from "../../components/ControlledInput"
import {emailRules, passwordRules} from "../../validation/rules"
import {Label, ErrorLabel} from "../../components/Label"
import {Button, SocialMediaButtons} from "../../components/Button"
import {useSignInWithEmailAndPassword} from "../../hooks/auth/useSignIn"

type FormData = {
  email: string
  password: string
}

const defaultValues: FormData = {email: "", password: ""}

/**
 * screen to login with email & password or
 * 3rd party services like Google, Facebook or Apple
 *
 * @param {AuthNavProps<"login">} {navigation} auth stack navigator
 * @returns `login` screen
 */
export default ({navigation}: AuthNavProps<"login">) => {
  const {control, handleSubmit, errors} = useForm<FormData>({defaultValues})
  const {signIn, error, isLoading} = useSignInWithEmailAndPassword()

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={tailwind("py-4 px-4")}>
        <Text style={tailwind("text-4xl font-semibold")}>Sign In</Text>
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
            <Label>Password</Label>
            <ControlledInput
              name="password"
              control={control}
              rules={passwordRules}
              placeholder="malone1234"></ControlledInput>
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          </View>
          <Button
            onPress={handleSubmit(signIn)}
            disabled={isLoading}
            style={tailwind("mb-4")}>
            Sign In
          </Button>
          <ErrorLabel>{error}</ErrorLabel>
          <RegisterLink navigation={navigation}></RegisterLink>
          <SocialMediaButtons title="or Sign In with"></SocialMediaButtons>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const RegisterLink: React.FC<Partial<AuthNavProps<"login">>> = ({
  navigation,
}) => (
  <View>
    <Text style={tailwind("pt-2 text-center text-gray-500")}>
      Don´t have an account yet?{" "}
      <Text
        onPress={() => navigation?.navigate("register")}
        style={tailwind("underline text-pink-500")}>
        Sign up
      </Text>
    </Text>
  </View>
)
