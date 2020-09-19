import * as React from "react"
import {AntDesign} from "@expo/vector-icons"
import {View, Text} from "react-native"
import tailwind from "tailwind-rn"

interface SettingProps {
  name: string
  iconName: string
}

/**
 * Renders commpoent for settings screen.
 *
 * @param {string} name of the setting, will act as a label
 * @param {string} iconName name of the expo ionicons icon
 * @param {string} description description of the setting
 * @returns {View} the setting component
 */
export const Setting: React.FC<SettingProps> = ({children, name, iconName}) => {
  return (
    <View style={tailwind("py-3 my-2 px-2 rounded-lg")}>
      <View style={tailwind("flex flex-row items-center justify-between")}>
        <View style={tailwind("flex flex-row items-center")}>
          <AntDesign name={iconName} size={20}></AntDesign>
          <Text style={tailwind("ml-2 text-lg")}>{name}</Text>
        </View>
        {children}
      </View>
    </View>
  )
}
