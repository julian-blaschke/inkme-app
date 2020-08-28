import * as React from "react"
import {SafeAreaView} from "react-native-safe-area-context"
import {FeedNavProps} from "../../navigation/FeedNavigator"

/**
 * Lists all storys of artists & shops you are subscirbed to,
 * as well as a feed of chronologically sorted posts, posted by
 * your subscriptions.
 *
 * @param {FeedNavProps<"feed">} {navigation} bottom tab navigator
 * @return the `feed` screen
 */
export default function ({navigation}: FeedNavProps<"feed">) {
  return <SafeAreaView></SafeAreaView>
}
