import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import {RouteProp} from "@react-navigation/native"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"

export type AuthParamList = {
  login: undefined
  register: undefined
}

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>
  route: RouteProp<AuthParamList, T>
}

const Stack = createStackNavigator()

export default function () {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="register" component={Register}></Stack.Screen>
    </Stack.Navigator>
  )
}
