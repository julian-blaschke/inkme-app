import * as React from "react"
import {Text, SafeAreaView, View} from "react-native"
import tailwind from "tailwind-rn"

/**
 * screen to search for artists/shops/styles or just
 * browse through posts the logged in user might like
 *
 * @returns `discover` screen as a scroll-view
 */
export default () => {
  return (
    <SafeAreaView>
      <View style={tailwind("p-4 flex flex-row justify-between")}></View>
    </SafeAreaView>
  )
}
