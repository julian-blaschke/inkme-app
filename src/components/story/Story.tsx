import * as React from "react"
import {View, Image, Text} from "react-native"
import tailwind from "tailwind-rn"
import {ScrollView} from "react-native-gesture-handler"

export interface StoryProps {
  title: string
  uri?: string
}

export const Story: React.FC<StoryProps> = props => {
  let {title, uri} = props
  return (
    <View style={tailwind("px-4")}>
      <Image source={{uri}} style={tailwind("h-20 w-20 rounded-full")}></Image>
      <Text style={tailwind("text-center font-semibold mt-1")}>{title}</Text>
    </View>
  )
}

export const Stories: React.FC<{stories: Array<StoryProps>}> = ({stories}) => {
  return (
    <ScrollView horizontal={true}>
      {stories.map((story, index) => (
        <Story key={index} {...story}></Story>
      ))}
    </ScrollView>
  )
}
