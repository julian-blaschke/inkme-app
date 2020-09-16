import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import tailwind, {getColor} from "tailwind-rn"
import FeedNavigator from "./FeedNavigator"
import CameraNavigator from "./CameraNavigator"
import MeNavigator from "./MeNavigator"
import DiscoverNavigator from "./DiscoverNavigator"
import {Image} from "react-native"

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
const Tab = createBottomTabNavigator<HomeParamList>()

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
          let icon = route.name === "feed" ? "home" : "rocket1"
          return <AntDesign name={icon} size={size} color={color}></AntDesign>
        },
      })}
      tabBarOptions={{
        activeTintColor: getColor("black"),
        inactiveTintColor: getColor("gray-500"),
        style: {
          backgroundColor: "transparent",
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen name="feed" component={FeedNavigator}></Tab.Screen>
      <Tab.Screen name="discover" component={DiscoverNavigator}></Tab.Screen>
    </Tab.Navigator>
  )
}

//Modal Navigation for `Me` & `Camera` screens (global modals)
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
