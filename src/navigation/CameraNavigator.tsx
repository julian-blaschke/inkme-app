import React from "react"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import Camera from "../screens/home/Camera"
import {RouteProp} from "@react-navigation/native"
import {CameraCapturedPicture} from "expo-camera"
import newPost from "../screens/home/newPost"

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
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen
        name="camera"
        component={Camera}
        options={({navigation}) => ({})}></Stack.Screen>
      <Stack.Screen name="newPost" component={newPost}></Stack.Screen>
    </Stack.Navigator>
  )
}
