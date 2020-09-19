import * as React from "react"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import tailwind from "tailwind-rn"
import Modal from "react-native-modal"
import {TouchableOpacity} from "react-native-gesture-handler"
import {CreateCollectionModalContent} from "../components/modal/CreateCollectionModalContent"
import MyCollections from "../screens/posts/MyCollections"
import MyCollection from "../screens/posts/MyCollection"

export type MyCollectionsParamList = {
  collections: undefined
  collection: {
    id: string
    name: string
  }
}

export type MyCollectionsNavProps<T extends keyof MyCollectionsParamList> = {
  navigation: StackNavigationProp<MyCollectionsParamList, T>
  route: RouteProp<MyCollectionsParamList, T>
}

const Stack = createStackNavigator<MyCollectionsParamList>()

export default () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 20, headerBackground: () => null}}>
      <Stack.Screen
        name="collections"
        component={MyCollections}
        options={({}) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: "My Collections",
          headerTitleStyle: tailwind("text-2xl"),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Modal
                isVisible={isOpen}
                swipeDirection={["up", "down"]}
                useNativeDriver={true}
                onSwipeComplete={() => setIsOpen(false)}
                hideModalContentWhileAnimating={true}
                onBackdropPress={() => setIsOpen(false)}>
                <CreateCollectionModalContent />
              </Modal>
              <AntDesign name="plus" size={24}></AntDesign>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
      <Stack.Screen
        name="collection"
        component={MyCollection}
        options={({route}: MyCollectionsNavProps<"collection">) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: `${route.params.name}`,
          headerTitleStyle: tailwind("text-2xl"),
          headerLeftContainerStyle: tailwind("px-4"),
          headerRight: () => (
            <TouchableOpacity onPress={() => null}>
              <AntDesign name="plus" size={24}></AntDesign>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("px-4"),
          gestureEnabled: true,
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
