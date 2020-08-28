import * as React from "react"
import {TouchableOpacity} from "react-native-gesture-handler"
import {
  GestureResponderEvent,
  Text,
  View,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native"
import tailwind from "tailwind-rn"

type OnPressHandler = ((event: GestureResponderEvent) => void) | undefined

/**
 * alternative to react-native`s button component
 *
 * @param onPress handler for the `onPress` event
 * @param style additional styles for the touchableopacity
 * @returns button as touchableOpacity component
 *
 */
export const Button: React.FC<{
  onPress?: OnPressHandler
  style?: StyleProp<ViewStyle>
}> = ({onPress, style, children}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Object.assign(
        tailwind("px-4 py-2 mt-10 bg-gray-900 rounded-lg"),
        style
      )}>
      <Text style={tailwind("text-xl text-center text-gray-100")}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

/**
 * component to sign in/up to inkme with a 3rd party
 * service like Google, Facebook & Apple
 *
 * @param source image source of the icon
 * @param onPress handler for the `onPress` event
 * @returns icon of the service
 */
export const SocialMediaButton: React.FC<{
  source: ImageSourcePropType
  onPress: OnPressHandler
}> = ({source, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={source} style={tailwind("h-10 w-10 mx-4")}></Image>
  </TouchableOpacity>
)

/**
 * horizontal list of socailmediabutton components
 *
 * @param title header for the horizontal list
 * @param onPressGoogle handler for Google
 * @param onFacebookhandler for Facebook
 * @param onApplehandler for Apple
 * @returns horizontal list of socialmedia buttons as view
 */
export const SocialMediaButtons: React.FC<{
  title: string
  onPressGoogle?: OnPressHandler
  onPressFacebook?: OnPressHandler
  onPressApple?: OnPressHandler
}> = ({title, onPressApple, onPressFacebook, onPressGoogle}) => (
  <View style={tailwind("pt-6")}>
    <Text style={tailwind("text-center text-gray-500")}>{title}</Text>
    <View style={tailwind("flex flex-row mt-10 justify-center")}>
      <SocialMediaButton
        onPress={onPressGoogle}
        source={require("../../assets/icons/socialMedia/Google.png")}></SocialMediaButton>
      <SocialMediaButton
        onPress={onPressFacebook}
        source={require("../../assets/icons/socialMedia/Facebook.png")}></SocialMediaButton>
      <SocialMediaButton
        onPress={onPressApple}
        source={require("../../assets/icons/socialMedia/Apple.jpg")}></SocialMediaButton>
    </View>
  </View>
)
