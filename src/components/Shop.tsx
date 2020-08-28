import * as React from "react"
import {TouchableOpacity, ScrollView} from "react-native-gesture-handler"
import {
  Image,
  GestureResponderEvent,
  StyleProp,
  ImageStyle,
  View,
  Text,
} from "react-native"
import tailwind from "tailwind-rn"

const fallbackURL =
  "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2290&q=80"

export interface ShopProps {
  photoURL?: string | undefined | null
  name: string | undefined | null
  role: string | undefined | null
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: StyleProp<ImageStyle>
}

/**
 * this component will be shown on a users timeline
 * it shows an image, name and role of the user at that shop.
 *
 * @param photoURL uri to the image source of the shop
 * @param name name of the shop
 * @param role the role a user has at this shop
 * @param onPress handler for the `onPress` event
 * @param style style for the image component
 * @returns circular image of shop with description
 */
export const Shop: React.FC<ShopProps> = ({
  photoURL,
  name,
  role,
  onPress,
  style,
}) => {
  const uri = photoURL || fallbackURL
  return (
    <View style={tailwind("flex items-center")}>
      <TouchableOpacity {...{onPress}}>
        <Image
          style={Object.assign(
            tailwind("h-20 w-20 rounded-full border-pink-500"),
            style
          )}
          source={{uri}}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={tailwind("mt-1 flex items-center")}>
        <Text style={tailwind("text-base")}>{name}</Text>
        <Text style={tailwind("text-xs text-gray-500 uppercase")}>{role}</Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * scrollable list of shops component
 *
 * @param shops an array of shopProps
 * @returns vertical scrollview of shop components
 */
export const Shops: React.FC<{shops: ShopProps[]}> = ({shops}) => {
  return (
    <ScrollView horizontal={true}>
      {shops.map((shop, i) => (
        <View style={tailwind("mr-6")}>
          <Shop key={i} {...shop}></Shop>
        </View>
      ))}
    </ScrollView>
  )
}
