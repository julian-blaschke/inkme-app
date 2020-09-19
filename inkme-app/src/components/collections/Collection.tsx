import React from "react"
import {Text, View} from "react-native"
import tailwind, {getColor} from "tailwind-rn"
import {Collection as ICollection} from "../../hooks/posts/useCollections"

export const Collection: React.FC<ICollection> = ({id, name, postsCount}) => {
  return (
    <View
      style={[
        tailwind("p-2 m-4 h-32 w-32 rounded-lg border-2 border-gray-400"),
        {
          elevation: 5,
          shadowColor: getColor("gray-500"),
          shadowOffset: {width: 5, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
      ]}>
      <View style={tailwind("h-full flex justify-end")}>
        <Text style={tailwind("text-base")}>{name}</Text>
        <Text style={tailwind("font-semibold uppercase text-xs text-gray-500")}>
          {postsCount || 0} posts
        </Text>
      </View>
    </View>
  )
}
