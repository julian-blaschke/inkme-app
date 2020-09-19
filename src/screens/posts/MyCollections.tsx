import React, {useContext} from "react"
import {View} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"
import TouchableScale from "react-native-touchable-scale"
import {Collection} from "../../components/collections/Collection"
import {UserContext} from "../../context/UserContext"
import {useCollections} from "../../hooks/posts/useCollections"
import {MyCollectionsNavProps} from "../../navigation/MyCollectionsNavigator"

export default ({navigation}: MyCollectionsNavProps<"collections">) => {
  const {user} = useContext(UserContext)
  const collections = useCollections(user!.uid)
  return (
    <ScrollView style={tailwind("p-4")}>
      <View style={tailwind("pb-4 justify-between flex flex-row flex-wrap")}>
        {collections?.map(collection => (
          <TouchableScale
            key={collection.id}
            activeScale={0.9}
            tension={50}
            friction={6}
            useNativeDriver
            onPress={() =>
              navigation.navigate("collection", {
                id: collection.id!,
                name: collection.name,
              })
            }>
            <Collection {...collection}></Collection>
          </TouchableScale>
        ))}
      </View>
    </ScrollView>
  )
}
