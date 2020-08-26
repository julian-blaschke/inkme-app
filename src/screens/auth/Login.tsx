import * as React from "react"
import tailwind from "tailwind-rn"
import {View, Text, KeyboardAvoidingView, Platform, Image} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {TextInput, TouchableOpacity} from "react-native-gesture-handler"
import {useForm, Controller} from "react-hook-form"
import {AuthNavProps} from "../../navigation/AuthNavigator"

type FormData = {
  email: string
  password: string
}

export default ({navigation}: AuthNavProps<"login">) => {
  const {control, handleSubmit, errors} = useForm<FormData>({
    defaultValues: {email: "", password: ""},
  })
  const onSubmit = handleSubmit(values => console.log(values))

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={tailwind("py-4 px-4")}>
        <Text style={tailwind("text-4xl font-semibold")}>Sign In</Text>
        <View style={tailwind("pt-10")}>
          <Text style={tailwind("py-2 text-xl font-semibold")}>Email</Text>
          <Controller
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid Email",
              },
            }}
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={tailwind(
                  "py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
                )}
                placeholder="example@email.com"
                onChangeText={onChange}
                {...{onBlur, value}}></TextInput>
            )}></Controller>
          <Text style={tailwind("text-pink-500")}>{errors.email?.message}</Text>
          <Text style={tailwind("py-2 pt-6 text-xl font-semibold ")}>
            Password
          </Text>
          <Controller
            name="password"
            rules={{
              required: "Password is required",
              minLength: {value: 5, message: "Password is too short"},
              maxLength: {value: 40, message: "Password is too long"},
            }}
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={tailwind(
                  "py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
                )}
                placeholder="password1234"
                secureTextEntry={true}
                onChangeText={onChange}
                {...{onBlur, value}}></TextInput>
            )}></Controller>
          <Text style={tailwind("text-pink-500")}>
            {errors.password?.message}
          </Text>
          <TouchableOpacity
            onPress={onSubmit}
            style={tailwind("px-4 py-2 mt-10 bg-gray-900 rounded-lg")}>
            <Text style={tailwind("text-xl text-center text-gray-100")}>
              Sign In
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={tailwind("pt-2 text-center text-gray-500")}>
              Don´t have an account yet?{" "}
              <Text
                onPress={() => navigation.navigate("register")}
                style={tailwind("underline text-pink-500")}>
                Sign up
              </Text>
            </Text>
          </View>
          <View style={tailwind("pt-6")}>
            <Text style={tailwind("text-center text-gray-500")}>
              or sign in with
            </Text>
            <View style={tailwind("flex flex-row mt-10 justify-center")}>
              <Image
                source={require("../../../assets/icons/socialMedia/Google.png")}
                style={tailwind("h-10 w-10 mx-4")}></Image>
              <Image
                source={require("../../../assets/icons/socialMedia/Facebook.png")}
                style={tailwind("h-10 w-10 mx-4")}></Image>
              <Image
                source={require("../../../assets/icons/socialMedia/Apple.jpg")}
                style={tailwind("h-10 w-10 mx-4")}></Image>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
