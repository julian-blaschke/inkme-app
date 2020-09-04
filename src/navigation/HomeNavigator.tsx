import * as React from "react"
import {StackNavigationProp} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {RouteProp} from "@react-navigation/native"
import {Ionicons} from "@expo/vector-icons"
import {getColor} from "tailwind-rn"
import Camera from "../screens/home/Camera"
import Discover from "../screens/home/Discover"
import FeedNavigator from "./FeedNavigator"

export type HomeParamList = {
  feed: undefined
  camera: undefined
  discover: undefined
}

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>
  route: RouteProp<HomeParamList, T>
}

const Tab = createBottomTabNavigator()

/**
 * core  navigator for this application
 *
 * @returns navigator with screens `feed`,`camera` & `discover`
 */
export default function () {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName
          if (route.name == "feed") iconName = "ios-home"
          else if (route.name == "camera") iconName = "ios-camera"
          else iconName = "ios-search"
          return <Ionicons name={iconName} {...{size, color}}></Ionicons>
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        activeTintColor: getColor("pink-500"),
        inactiveTintColor: getColor("gray-700"),
      }}>
      <Tab.Screen name="feed" component={FeedNavigator}></Tab.Screen>
      <Tab.Screen name="camera" component={Camera}></Tab.Screen>
      <Tab.Screen name="discover" component={Discover}></Tab.Screen>
    </Tab.Navigator>
  )
}
