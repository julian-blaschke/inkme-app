import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import {RouteProp} from "@react-navigation/native"
import tailwind from "tailwind-rn"
import {AntDesign} from "@expo/vector-icons"
import Me from "../screens/user/Me"
import MySettings from "../screens/user/MySettings"
import {UserContext} from "../context/UserContext"
import {Text} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"

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
  const {user} = React.useContext(UserContext)

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 20, headerBackground: () => null}}>
      <Stack.Screen
        name="me"
        component={Me}
        options={({navigation}) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: `@${user?.username}`,
          headerTitleStyle: tailwind("text-2xl"),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <AntDesign
              name="setting"
              size={24}
              onPress={() => navigation.navigate("mySettings")}></AntDesign>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
      <Stack.Screen
        name="mySettings"
        component={MySettings}
        options={({navigation}) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: "Settings",
          headerTitleStyle: tailwind("text-2xl"),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Close</Text>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
