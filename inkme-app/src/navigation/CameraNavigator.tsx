import React from "react"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import Camera from "../screens/home/Camera"
import {RouteProp} from "@react-navigation/native"
import {CameraCapturedPicture} from "expo-camera"
import {AntDesign} from "@expo/vector-icons"
import newPost from "../screens/home/newPost"
import tailwind from "tailwind-rn"

export type CameraParamList = {
  camera: undefined
  newPost: {photo: CameraCapturedPicture}
}

export type CameraNavProps<T extends keyof CameraParamList> = {
  navigation: StackNavigationProp<CameraParamList, T>
  route: RouteProp<CameraParamList, T>
}

const Stack = createStackNavigator<CameraParamList>()

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 20, headerBackground: () => null}}>
      <Stack.Screen
        name="camera"
        component={Camera}
        options={({navigation}) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: "Camera",
          headerTitleStyle: tailwind("text-2xl"),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <AntDesign
              name="close"
              size={24}
              onPress={() => navigation.goBack()}></AntDesign>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
      <Stack.Screen name="newPost" component={newPost}></Stack.Screen>
    </Stack.Navigator>
  )
}
