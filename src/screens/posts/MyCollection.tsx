import React from "react"
import {View} from "react-native"
import tailwind from "tailwind-rn"
import {MyCollectionsNavProps} from "../../navigation/MyCollectionsNavigator"

export default ({route}: MyCollectionsNavProps<"collection">) => {
  return <View style={tailwind("h-full w-full")}></View>
}
