import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import tailwind, {getColor} from "tailwind-rn"
import {RouteProp} from "@react-navigation/native"
import {Ionicons} from "@expo/vector-icons"
import Feed from "../screens/home/Feed"
import useUser from "../hooks/auth/useUser"
import Me from "../screens/user/Me"
import {Avatar} from "../components/Avatar"

export type FeedParamList = {
  feed: undefined
  myProfile: undefined
}

export type FeedNavProps<T extends keyof FeedParamList> = {
  navigation: StackNavigationProp<FeedParamList, T>
  route: RouteProp<FeedParamList, T>
}

const Stack = createStackNavigator()

/**
 * navigator for the `feed` screen
 *
 * @returns navigator with screens `feed` & `myProfile`
 */
export default function () {
  const user = useUser()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="feed"
        component={Feed}
        options={({navigation}) => ({
          title: "Subscriptions ",
          headerRight: () => (
            <Avatar
              photoURL={user?.photoURL}
              onPress={() => navigation.navigate("myProfile")}
              style={tailwind("h-10 w-10 border-2")}></Avatar>
          ),
          headerRightContainerStyle: tailwind("p-4"),
          headerTitleStyle: tailwind("text-2xl font-semibold"),
          headerTitleAlign: "left",
          headerBackground: () => null,
        })}></Stack.Screen>
      <Stack.Screen
        name="myProfile"
        component={Me}
        options={() => ({
          title: user?.displayName || "My Profile",
          headerBackImage: () => (
            <Ionicons
              name="ios-arrow-down"
              size={30}
              style={tailwind("px-4")}></Ionicons>
          ),
          headerBackTitleVisible: false,
          headerRight: () => (
            <Ionicons
              name="ios-settings"
              size={25}
              style={tailwind("px-4")}
              color={getColor("gray-900")}></Ionicons>
          ),
          headerTitleStyle: tailwind("text-xl font-semibold"),
          headerBackground: () => null,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
