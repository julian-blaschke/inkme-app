import * as React from "react"
import {View, Text, ActivityIndicator} from "react-native"
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler"
import {AntDesign} from "@expo/vector-icons"
import tailwind, {getColor} from "tailwind-rn"
import Modal from "react-native-modal"
import {Avatar} from "../../components/profile/Avatar"
import {useOtherUser} from "../../hooks/auth/useOtherUser"
import {DiscoverNavProps} from "../../navigation/DiscoverNavigator"
import {FeedNavProps} from "../../navigation/FeedNavigator"
import {UserModalContent} from "../../components/modal/UserModalContent"
import {Button} from "../../components/Button"
import {takeLast} from "rxjs/operators"
import {SubscriberCount} from "../../components/profile/SubscriberCount"

const Center: React.FC = ({children}) => (
  <View style={tailwind("flex-1")}>{children}</View>
)

export default function ({
  route,
}: FeedNavProps<"user"> | DiscoverNavProps<"user">) {
  const {isFetching, error, user} = useOtherUser(route.params.uid)
  const [isModalVisible, setModalVisible] = React.useState(false)
  const close = React.useCallback(() => setModalVisible(false), [
    setModalVisible,
  ])

  if (isFetching)
    return (
      <Center>
        <ActivityIndicator />
      </Center>
    )

  if (error)
    return (
      <Center>
        <Text>{error}</Text>
      </Center>
    )

  return (
    <ScrollView stickyHeaderIndices={[3]}>
      <View style={tailwind("p-4 w-full flex flex-row")}>
        <Modal
          useNativeDriver={true}
          swipeDirection={["up", "down"]}
          onSwipeComplete={close}
          hideModalContentWhileAnimating={true}
          isVisible={isModalVisible}
          onBackdropPress={close}>
          <UserModalContent user={user} close={close}></UserModalContent>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Avatar
            photoURL={user?.photoURL}
            style={tailwind("h-20 w-20")}></Avatar>
        </TouchableOpacity>
        <Text style={tailwind("ml-4 flex-shrink font-light text-gray-700")}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At
        </Text>
      </View>
      <View style={tailwind("p-4 mt-8 flex flex-row justify-between")}>
        <SubscriberCount label="subscribers" value={32}></SubscriberCount>
        <SubscriberCount label="posts" value={29}></SubscriberCount>
        <SubscriberCount label="subscriptions" value={1221}></SubscriberCount>
      </View>
      <View style={tailwind("p-4 flex")}>
        <Button style={tailwind("bg-black")}>
          <AntDesign
            name="addusergroup"
            size={14}
            color={getColor("gray-100")}
            style={tailwind("mr-1")}></AntDesign>
          <Text style={tailwind("text-gray-100")}>Subscribe!</Text>
        </Button>
      </View>
      <View style={tailwind("mt-4 px-4 justify-between ")}>
        <Text style={tailwind("text-2xl font-semibold")}>Posts</Text>
      </View>
    </ScrollView>
  )
}
