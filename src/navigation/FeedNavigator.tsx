import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import tailwind from "tailwind-rn"
import {RouteProp, useNavigation} from "@react-navigation/native"
import {Ionicons} from "@expo/vector-icons"
import Feed from "../screens/home/Feed"
import Me from "../screens/user/Me"
import {useUser} from "../hooks/auth/useUser"
import {View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import create from "zustand"
import {Avatar} from "../components/profile/Avatar"

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
  const {user} = useUser()
  const navigationRef = React.createRef()

  return (
    <Stack.Navigator screenOptions={{headerBackground: () => null}}>
      <Stack.Screen
        name="feed"
        component={Feed}
        options={({navigation}) => ({
          headerTitleAlign: "left",
          title: "Feed",
          headerTitleStyle: tailwind("text-3xl text-teal-500  "),
          headerRight: () => (
            <View style={tailwind("flex flex-row items-center")}>
              <TouchableOpacity onPress={() => navigation.navigate("modal")}>
                <Ionicons
                  name="ios-add"
                  size={40}
                  style={tailwind("px-4")}></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("me")}>
                <Avatar
                  photoURL={user?.photoURL}
                  style={tailwind("w-10 h-10")}></Avatar>
              </TouchableOpacity>
            </View>
          ),
          headerRightContainerStyle: tailwind("mx-3"),
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
