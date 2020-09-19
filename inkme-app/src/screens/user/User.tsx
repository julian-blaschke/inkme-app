import React, {useCallback, useContext, useState} from "react"
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
import {SubscriberCount} from "../../components/profile/SubscriberCount"
import {UserContext} from "../../context/UserContext"
import {useSubscribe} from "../../hooks/subscriptions/useSubscribe"
import {ErrorLabel} from "../../components/Label"
import {useSubscription} from "../../hooks/subscriptions/useSubscription"

const Center: React.FC = ({children}) => (
  <View style={tailwind("flex-1")}>{children}</View>
)

export default function ({
  route,
}: FeedNavProps<"user"> | DiscoverNavProps<"user">) {
  const {user: me} = useContext(UserContext)
  const {isFetching, user} = useOtherUser(route.params.uid)
  const isSubscribed = useSubscription({
    subscriptionId: user?.uid,
    subscriberId: me?.uid,
  })
  const {subscribe, isLoading: isSubscribing} = useSubscribe()

  const [isModalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState("")
  const close = useCallback(() => setModalVisible(false), [setModalVisible])

  const onSubscribe = async () => {
    try {
      await subscribe({subscriberId: me?.uid, subscriptionId: user?.uid})
    } catch ({message}) {
      setError(message)
    }
  }

  if (isFetching)
    return (
      <Center>
        <ActivityIndicator />
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
      <View style={tailwind("p-4 flex flex-row justify-between")}>
        <SubscriberCount label="subscribers" value={32}></SubscriberCount>
        <SubscriberCount label="posts" value={29}></SubscriberCount>
        <SubscriberCount label="subscriptions" value={1221}></SubscriberCount>
      </View>
      <View style={tailwind("p-4 flex")}>
        {!isSubscribed ? (
          <Button
            style={tailwind("bg-black")}
            onPress={onSubscribe}
            disabled={isSubscribing}>
            <Text style={tailwind("text-gray-100")}>Subscribe!</Text>
          </Button>
        ) : (
          <Button
            style={tailwind("bg-gray-300")}
            onPress={onSubscribe}
            disabled={isSubscribing}>
            <Text style={tailwind("text-black")}>Unsubscribe</Text>
          </Button>
        )}
        <ErrorLabel>{error}</ErrorLabel>
      </View>
      <View style={tailwind("mt-4 px-4 justify-between ")}>
        <Text style={tailwind("text-2xl font-semibold")}>Posts</Text>
      </View>
    </ScrollView>
  )
}
