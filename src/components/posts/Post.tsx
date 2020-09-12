import * as React from "react"
import {View, Image, Text} from "react-native"
import tailwind from "tailwind-rn"

interface PostProps {
  downloadURL: string
}

export const Post: React.FC<PostProps> = ({downloadURL}) => {
  return (
    <Image
      style={tailwind("h-64 my-4 rounded-lg bg-gray-400")}
      source={{uri: downloadURL}}></Image>
  )
}
