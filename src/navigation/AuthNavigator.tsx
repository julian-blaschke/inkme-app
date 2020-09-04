import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import {RouteProp} from "@react-navigation/native"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"
import ChooseUsername from "../screens/auth/ChooseUsername"

export type AuthParamList = {
  login: undefined
  register: undefined
  chooseUsername: undefined
}

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>
  route: RouteProp<AuthParamList, T>
}

const Stack = createStackNavigator()

/**
 * helps navigate to authentication-related screens
 *
 * @return navigator with screens `login` and `register`
 */
export default function () {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="register" component={Register}></Stack.Screen>
      <Stack.Screen
        name="chooseUsername"
        component={ChooseUsername}></Stack.Screen>
    </Stack.Navigator>
  )
}
