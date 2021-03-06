import React from "react"
import tailwind from "tailwind-rn"
import {View, Image, Text, GestureResponderEvent} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import {Result} from "../../hooks/search/useSearchResults"
import {TouchableOpacity} from "react-native-gesture-handler"

interface SearchResultProps extends Result {
  onPress?: (event: GestureResponderEvent) => void
}

export const SearchResult: React.FC<SearchResultProps> = ({
  username,
  photoURL,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind("p-4 flex flex-row justify-between items-center")}>
      <View style={tailwind("flex flex-row items-center")}>
        <Image
          source={{uri: photoURL}}
          style={tailwind("h-10 w-10 mr-2 bg-gray-500 rounded-full")}></Image>
        <View style={tailwind("flex")}>
          <Text style={tailwind("text-base font-medium")}>{username}</Text>
          <Text style={tailwind("text-xs font-light text-gray-500")}>
            Test test test sfjkaösdf stsetsfas sfd.j
          </Text>
        </View>
      </View>
      <AntDesign name="right" size={20}></AntDesign>
    </TouchableOpacity>
  )
}
