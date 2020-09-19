import * as React from "react"
import {RouteProp} from "@react-navigation/native"
import {AntDesign} from "@expo/vector-icons"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import tailwind from "tailwind-rn"
import Modal from "react-native-modal"
import {TouchableOpacity} from "react-native-gesture-handler"
import {CreateShopModalContent} from "../components/modal/CreateShopModalContent"
import myShops from "../screens/shop/MyShops"

export type MyShopsParamList = {
  shops: undefined
}

export type MeNavProps<T extends keyof MyShopsParamList> = {
  navigation: StackNavigationProp<MyShopsParamList, T>
  route: RouteProp<MyShopsParamList, T>
}

const Stack = createStackNavigator<MyShopsParamList>()

export default () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Stack.Navigator
      screenOptions={{headerStatusBarHeight: 20, headerBackground: () => null}}>
      <Stack.Screen
        name="shops"
        component={myShops}
        options={({navigation}) => ({
          headerLeft: () => null,
          headerTitleAlign: "left",
          title: "My Shops",
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
                <CreateShopModalContent></CreateShopModalContent>
              </Modal>
              <AntDesign name="plus" size={24}></AntDesign>
            </TouchableOpacity>
          ),
          headerRightContainerStyle: tailwind("px-4"),
        })}></Stack.Screen>
    </Stack.Navigator>
  )
}
