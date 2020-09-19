import React, {useContext} from "react"
import {FeedNavProps} from "../../navigation/FeedNavigator"
import {StoryProps, Stories} from "../../components/story/Story"
import tailwind from "tailwind-rn"
import {ScrollView, View} from "react-native"
import {useFeed} from "../../hooks/posts/useFeed"
import {UserContext} from "../../context/UserContext"
import {Post} from "../../components/posts/Post"

/**
 * Lists all storys of artists & shops you are subscirbed to,
 * as well as a feed of chronologically sorted posts, posted by
 * your subscriptions.
 *
 * @param {FeedNavProps<"feed">} {navigation} bottom tab navigator
 * @return the `feed` screen
 */
export default function ({navigation}: FeedNavProps<"feed">) {
  const {user} = useContext(UserContext)
  const posts = useFeed(user?.uid)

  return (
    <ScrollView>
      {posts?.map(post => (
        <Post key={post.id} downloadURL={post.downloadURL}></Post>
      ))}
    </ScrollView>
  )
}
