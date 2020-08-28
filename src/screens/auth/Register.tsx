import * as React from "react"
import tailwind from "tailwind-rn"
import {View, Text, Image, KeyboardAvoidingView, Platform} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {TextInput, TouchableOpacity} from "react-native-gesture-handler"
import {useForm, Controller} from "react-hook-form"
import {AuthNavProps} from "../../navigation/AuthNavigator"
import firebase from "../../../firebase"
import {ControlledInput} from "../../components/ControlledInput"
import {emailRules, usernameRules, passwordRules} from "../../validation/rules"
import {Label, ErrorLabel} from "../../components/Label"
import {Button, SocialMediaButtons} from "../../components/Button"

type FormData = {
  email: string
  username: string
  password: string
}

/**
 * screen to register with either email, username & password or
 * 3rd party services like Google, Facebook or Apple
 *
 * @param {AuthNavProps<"register">} {navigation} auth stack navigator
 * @returns `register` screen
 */
export default ({navigation}: AuthNavProps<"login">) => {
  const {control, handleSubmit, errors} = useForm<FormData>({
    defaultValues: {email: "", username: "", password: ""},
  })

  const onSubmit = handleSubmit(async ({email, username, password}) => {
    try {
      const {user} = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await user?.updateProfile({displayName: username})
    } catch (err) {
      console.error(err)
    }
  })

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
          <Button onPress={onSubmit} style={tailwind("bg-pink-500")}>
            Sign Up
          </Button>
          <LoginLink navigation={navigation}></LoginLink>
          <SocialMediaButtons title="or Sign Up with"></SocialMediaButtons>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const LoginLink: React.FC<Partial<AuthNavProps<"login">>> = ({navigation}) => (
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
