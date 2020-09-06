import * as React from "react"
import {FeedNavProps} from "../../navigation/FeedNavigator"
import {StoryProps, Stories} from "../../components/story/Story"
import tailwind from "tailwind-rn"
import {View, SafeAreaView, Text} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar} from "../../components/Avatar"
import {useUser} from "../../hooks/auth/useUser"

/**
 * Lists all storys of artists & shops you are subscirbed to,
 * as well as a feed of chronologically sorted posts, posted by
 * your subscriptions.
 *
 * @param {FeedNavProps<"feed">} {navigation} bottom tab navigator
 * @return the `feed` screen
 */
export default function ({navigation}: FeedNavProps<"feed">) {
  const stories: StoryProps[] = [
    {
      title: "postmalone",
      uri:
        "https://i.pinimg.com/originals/f3/a8/9a/f3a89a1b76ba089b7ef1aec8eab1978f.jpg",
    },
    {
      title: "slimshady",
      uri:
        "https://www.bravo.de/assets/field/image/rapper_eminem_so_lange_halt_er_es_ohne_drogen_aus.jpg",
    },
  ]
  return (
    <View style={tailwind("mt-4")}>
      <Stories stories={stories}></Stories>
    </View>
  )
}
