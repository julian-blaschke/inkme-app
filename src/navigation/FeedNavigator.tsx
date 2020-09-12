import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack"
import tailwind from "tailwind-rn"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import Feed from "../screens/home/Feed"
import {View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {Avatar} from "../components/profile/Avatar"
import {UserContext} from "../context/UserContext"

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
  const {user} = React.useContext(UserContext)

  return (
    <Stack.Navigator screenOptions={{headerBackground: () => null}}>
      <Stack.Screen
        name="feed"
        component={Feed}
        options={({navigation}) => ({
          headerTitleAlign: "left",
          title: "Feed",
          headerTitleStyle: tailwind("text-2xl"),
          headerRight: () => (
            <View style={tailwind("flex flex-row items-center")}>
              <TouchableOpacity onPress={() => navigation.navigate("modal")}>
                <AntDesign
                  name="plus"
                  size={24}
                  style={tailwind("mr-6")}></AntDesign>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("me")}>
                <AntDesign
                  name="user"
                  size={24}
                  style={tailwind("")}></AntDesign>
              </TouchableOpacity>
            </View>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
