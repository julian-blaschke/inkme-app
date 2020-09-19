import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import {StackNavigationProp} from "@react-navigation/stack"
import * as React from "react"
import MyProfileNavigator from "./MyProfileNavigator"
import {getColor} from "tailwind-rn"
import myShops from "../screens/shop/MyShops"
import MyCollectionsNavigator from "./MyCollectionsNavigator"
import MyShopsNavigator from "./MyShopsNavigator"

export type MeParamList = {
  myProfile: undefined
  myShops: undefined
  myCollections: undefined
}

export type MeNavProps<T extends keyof MeParamList> = {
  navigation: StackNavigationProp<MeParamList, T>
  route: RouteProp<MeParamList, T>
}

const Tab = createBottomTabNavigator<MeParamList>()

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="myProfile"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let icon = ""
          if (route.name === "myProfile") {
            icon = "user"
          } else if (route.name === "myShops") {
            icon = "isv"
          } else {
            icon = "book"
          }
          return <AntDesign name={icon} size={size} color={color}></AntDesign>
        },
      })}
      tabBarOptions={{
        activeTintColor: getColor("black"),
        inactiveTintColor: getColor("gray-500"),
        showLabel: false,
      }}>
      <Tab.Screen name="myShops" component={MyShopsNavigator}></Tab.Screen>
      <Tab.Screen name="myProfile" component={MyProfileNavigator}></Tab.Screen>
      <Tab.Screen
        name="myCollections"
        component={MyCollectionsNavigator}></Tab.Screen>
    </Tab.Navigator>
  )
}
