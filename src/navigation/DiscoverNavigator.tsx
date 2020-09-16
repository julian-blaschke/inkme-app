import * as React from "react"
import {
  StackNavigationProp,
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import Discover from "../screens/home/Discover"
import tailwind from "tailwind-rn"
import {TouchableOpacity} from "react-native-gesture-handler"
import {Text} from "react-native"
import Search from "../screens/home/Search"
import {SearchInput} from "../components/search/SearchInput"
import {UserParamList, addUserRoutes} from "./addUserRoutes"

export type DiscoverParamList = {
  discover: undefined
  search: {
    input: string
  }
} & UserParamList

export type DiscoverNavProps<T extends keyof DiscoverParamList> = {
  navigation: StackNavigationProp<DiscoverParamList, T>
  route: RouteProp<DiscoverParamList, T>
}

const Stack = createStackNavigator<DiscoverParamList>()

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="discover"
      screenOptions={() => ({
        headerBackground: () => null,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      })}>
      {addUserRoutes(Stack as any)}
      <Stack.Screen
        name="discover"
        component={Discover}
        options={({navigation}) => ({
          headerTitleAlign: "left",
          title: "Discover",
          headerTitleStyle: tailwind("text-2xl"),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("search")}>
              <AntDesign name="search1" size={24}></AntDesign>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("mx-4"),
        })}></Stack.Screen>
      <Stack.Screen
        name="search"
        component={Search}
        options={({navigation}: DiscoverNavProps<"search">) => ({
          headerLeft: () => null,
          headerTitleContainerStyle: tailwind("w-full px-4 pr-20 "),
          headerTitle: () => (
            <SearchInput navigation={navigation}></SearchInput>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
