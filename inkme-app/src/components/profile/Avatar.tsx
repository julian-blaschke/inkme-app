import React from "react"
import {ImageProps, Image} from "react-native"
import tailwind from "tailwind-rn"

interface AvatarProps extends Partial<ImageProps> {
  photoURL?: string | null
}

/**
 * Component to show a user`s avatar as a rounded image
 *
 * @param {string} photoURL uri to the users avatar
 * @returns {Image} rounded avatar
 */
export const Avatar: React.FC<AvatarProps> = props => {
  let {style, photoURL, ...rest} = props
  let uri =
    photoURL ||
    "https://images.unsplash.com/photo-1571115486184-cca88bc4d2ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  return (
    <Image
      style={Object.assign(tailwind("rounded-lg"), style)}
      source={{uri}}
      {...rest}></Image>
  )
}
