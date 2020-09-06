import React from "react"
import {ImageProps, Image} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"

interface AvatarProps extends Partial<ImageProps> {
  photoURL?: string | null
}

export const Avatar: React.FC<AvatarProps> = props => {
  let {style, photoURL, ...rest} = props
  let uri = photoURL || "https://img.icons8.com/doodle/48/000000/user.png"
  return (
    <Image
      style={Object.assign(tailwind("rounded-full"), style)}
      source={{uri}}
      {...rest}></Image>
  )
}
