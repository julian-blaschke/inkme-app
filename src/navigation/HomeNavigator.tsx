import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {RouteProp} from "@react-navigation/native"
import {Ionicons} from "@expo/vector-icons"
import {getColor} from "tailwind-rn"
import Discover from "../screens/home/Discover"
import FeedNavigator from "./FeedNavigator"
import CameraNavigator from "./CameraNavigator"
import MeNavigator from "./MeNavigator"

export type HomeParamList = {
  feed: undefined
  camera: undefined
  discover: undefined
}

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>
  route: RouteProp<HomeParamList, T>
}

const RootStack = createStackNavigator()
const Tab = createBottomTabNavigator()

/**
 * core  navigator for this application
 *
 * @returns {Navigator} navigator with screens `feed`,`camera` & `discover`
 */
const HomeNavigator = function () {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName
          if (route.name == "feed") iconName = "ios-home"
          else iconName = "ios-search"
          return <Ionicons name={iconName} {...{size, color}}></Ionicons>
        },
      })}
      tabBarOptions={{
        activeTintColor: getColor("teal-500"),
        inactiveTintColor: getColor("gray-700"),
        style: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen name="feed" component={FeedNavigator}></Tab.Screen>
      <Tab.Screen name="discover" component={Discover}></Tab.Screen>
    </Tab.Navigator>
  )
}

//wrapper to open Camera Modal
export default function () {
  return (
    <RootStack.Navigator
      initialRouteName="home"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      mode="modal"
      headerMode="none">
      <RootStack.Screen
        name="home"
        component={HomeNavigator}></RootStack.Screen>
      <RootStack.Screen
        name="modal"
        component={CameraNavigator}></RootStack.Screen>
      <RootStack.Screen name="me" component={MeNavigator}></RootStack.Screen>
    </RootStack.Navigator>
  )
}
