import * as React from "react"
import {View, Text, ScrollView, ActivityIndicator} from "react-native"
import tailwind from "tailwind-rn"
import {Avatar} from "../../components/profile/Avatar"
import {SubscriberCount} from "../../components/profile/SubscriberCount"
import {UserContext} from "../../context/UserContext"
import {Post} from "../../components/posts/Post"
import {usePosts} from "../../hooks/posts/usePosts"

/**
 * Shows all information of the currently logged in user, such as
 * subscriber, subscription & post consts
 * avatar and Biography
 * shops & guestspots this user has worked/ is working at
 * all posts this user has posted/is associated with
 * options to change any of the given information
 *
 * @returns screen for my profile
 */
export default () => {
  const {user} = React.useContext(UserContext)
  //const {isFetching, posts} = usePosts(user!.uid)
  let isFetching = false
  let posts = []

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <View style={tailwind("p-4 w-full flex flex-row")}>
        <Avatar
          photoURL={user?.photoURL}
          style={tailwind("h-20 w-20")}></Avatar>
        <Text style={tailwind("ml-4 flex-shrink font-light text-gray-700")}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At
        </Text>
      </View>
      <View style={tailwind("mt-4 px-4 justify-between ")}>
        <Text style={tailwind("text-2xl font-semibold")}>Posts</Text>
      </View>
      <View style={tailwind("mt-2 px-4")}>
        {isFetching ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          posts?.map(post => (
            <Post key={post.id} downloadURL={post.downloadURL}></Post>
          ))
        )}
      </View>
    </ScrollView>
  )
}
