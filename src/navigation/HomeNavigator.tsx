import * as React from "react"
import {StackNavigationProp} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {RouteProp} from "@react-navigation/native"
import Feed from "../screens/home/Feed"

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

export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="feed" component={Feed}></Tab.Screen>
    </Tab.Navigator>
  )
}
