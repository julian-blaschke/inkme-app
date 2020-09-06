import * as React from "react"
import {View, ActivityIndicator, Text} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {Camera} from "expo-camera"
import tailwind from "tailwind-rn"
import {useCameraPermission} from "../../hooks/useCamera"
import {TouchableOpacity} from "react-native-gesture-handler"
import {CameraNavProps} from "../../navigation/CameraNavigator"

/**
 * screen to take photos/video and post them to
 * story or timeline
 *
 * @returns `camera` screen as full-screen camera
 */
export default ({navigation}: CameraNavProps<"camera">) => {
  const hasPermission = useCameraPermission()
  const [type, setType] = React.useState("back")
  const [camera, setCamera] = React.useState<Camera | null>(null)

  if (hasPermission == null) {
    return <ActivityIndicator></ActivityIndicator>
  }
  if (!hasPermission) {
    return (
      <View style={tailwind("flex flex-1 justify-center items-center")}>
        <Text>No Camera permission</Text>
      </View>
    )
  }
  return (
    <Camera
      style={tailwind("flex w-full h-full")}
      type={type}
      ref={ref => setCamera(ref)}>
      <View
        style={tailwind("p-4 w-full absolute flex flex-row justify-between")}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-close"
            size={45}
            style={tailwind("text-gray-200")}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType(type === "back" ? "front" : "back")}>
          <Ionicons
            name="ios-reverse-camera"
            size={40}
            style={tailwind("text-gray-200")}></Ionicons>
        </TouchableOpacity>
      </View>
      <View
        style={tailwind(
          "p-4 bottom-0 w-full absolute flex flex-row justify-center"
        )}>
        <TouchableOpacity
          onPress={async () => {
            //take photo
            if (camera) {
              let photo = await camera.takePictureAsync()
              console.log(photo)
              navigation.navigate("newPost", {photo})
            }
          }}
          onLongPress={alert}>
          <Ionicons
            name="ios-radio-button-on"
            size={90}
            style={tailwind("text-gray-200")}></Ionicons>
        </TouchableOpacity>
      </View>
    </Camera>
  )
}
