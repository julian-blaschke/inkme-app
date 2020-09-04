import * as React from "react"
import {TouchableOpacity} from "react-native-gesture-handler"
import {Image, GestureResponderEvent, StyleProp, ImageStyle} from "react-native"
import tailwind from "tailwind-rn"

const fallbackURL =
  "https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2290&q=80"

export interface AvatarProps {
  photoURL?: string | undefined | null
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: StyleProp<ImageStyle>
}

/**
 * classic, rounded avatar component
 *
 * @param photoURL uri to the source (if not provided, a default uri will be used)
 * @param onPress handler for the `onPress` event
 * @param style  style for the image component
 * @return The Avatar Component
 */
export const Avatar: React.FC<AvatarProps> = ({photoURL, onPress, style}) => {
  const uri = photoURL || fallbackURL
  return (
    <TouchableOpacity {...{onPress}}>
      <Image
        style={Object.assign(tailwind("rounded-full"), style)}
        source={{uri}}></Image>
    </TouchableOpacity>
  )
}
