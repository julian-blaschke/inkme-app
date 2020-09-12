import React, {useRef} from "react"
import {View, Text, Picker} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import {TouchableOpacity} from "react-native-gesture-handler"
import RBSheet from "react-native-raw-bottom-sheet"
import {Setting} from "../../components/settings/Setting"
import tailwind from "tailwind-rn"

export function GeneralSettings() {
  const modalRef = useRef<RBSheet>(null)
  return (
    <>
      {/** Dark Mode */}
      <TouchableOpacity onPress={() => modalRef.current?.open()}>
        <Setting name="Appearence" iconName="bulb1">
          <AntDesign name="down" size={16}></AntDesign>
        </Setting>
      </TouchableOpacity>
      <TouchableOpacity>
        <Setting name="Notifications" iconName="notification">
          <AntDesign name="down" size={16}></AntDesign>
        </Setting>
      </TouchableOpacity>
      <RBSheet ref={modalRef}>
        <Text style={tailwind("mt-4 text-2xl font-semibold text-center")}>
          Select Appearence
        </Text>
        <Text
          style={tailwind("mt-2 text-sm font-light text-gray-600 text-center")}>
          Appearence `Automatic` will adapt to your systems appearence
        </Text>
        <Picker>
          <Picker.Item label="Automatic"></Picker.Item>
          <Picker.Item label="Dark Mode"></Picker.Item>
          <Picker.Item label="Light Mode"></Picker.Item>
        </Picker>
      </RBSheet>
    </>
  )
}
