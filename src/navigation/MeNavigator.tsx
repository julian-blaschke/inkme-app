import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import {RouteProp} from "@react-navigation/native"
import tailwind from "tailwind-rn"
import {Ionicons} from "@expo/vector-icons"
import Me from "../screens/user/Me"
import MySettings from "../screens/user/MySettings"

export type MeParamList = {
  me: undefined
  mySettings: undefined
}

export type MeNavProps<T extends keyof MeParamList> = {
  navigation: StackNavigationProp<MeParamList, T>
  route: RouteProp<MeParamList, T>
}

const Stack = createStackNavigator<MeParamList>()

/**
 * handles all navigation related to the logged in user`s profile.
 *
 *  @returns {Navigator} the `me` Navigator
 */
export default () => {
  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 20, headerBackground: () => null}}>
      <Stack.Screen
        name="me"
        component={Me}
        options={({navigation}) => ({
          title: "",
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-down"
              size={32}
              onPress={() => navigation.goBack()}></Ionicons>
          ),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <Ionicons
              name="ios-settings"
              size={32}
              onPress={() => navigation.navigate("mySettings")}></Ionicons>
          ),
          headerRightContainerStyle: tailwind("px-4"),
          headerBackTitleVisible: false,
        })}></Stack.Screen>
      <Stack.Screen
        name="mySettings"
        component={MySettings}
        options={({navigation}) => ({title: "Settings"})}></Stack.Screen>
    </Stack.Navigator>
  )
}
