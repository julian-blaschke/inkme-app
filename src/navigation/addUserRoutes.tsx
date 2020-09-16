import * as React from "react"
import {TypedNavigator, StackNavigationState} from "@react-navigation/native"
import {DiscoverParamList, DiscoverNavProps} from "./DiscoverNavigator"
import {FeedParamList, FeedNavProps} from "./FeedNavigator"
import {AntDesign} from "@expo/vector-icons"
import {TouchableOpacity} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"
import User from "../screens/user/User"
import {StackNavigationOptions} from "@react-navigation/stack"

export type UserParamList = {
  user: {
    uid: string
    username: string
  }
}

export type UserNavProps = DiscoverNavProps<"user"> | FeedNavProps<"user">

export const addUserRoutes = (
  Stack: TypedNavigator<
    DiscoverParamList | FeedParamList,
    StackNavigationState,
    StackNavigationOptions,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        name="user"
        component={User}
        options={({route, navigation}: UserNavProps) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: `@${route.params.username}`,
          headerTitleStyle: tailwind("text-2xl"),
          headerRight: () => (
            <TouchableOpacity onPress={() => null}>
              <AntDesign name="ellipsis1" size={24}></AntDesign>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("mx-4"),
        })}></Stack.Screen>
    </>
  )
}
