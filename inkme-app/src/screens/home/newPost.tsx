import React, {useState} from "react"
import {
  View,
  Image,
  Text,
  Picker,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native"
import tailwind from "tailwind-rn"
import {Ionicons} from "@expo/vector-icons"
import {Bar} from "react-native-progress"
import {CameraNavProps} from "../../navigation/CameraNavigator"
import {Label, ErrorLabel} from "../../components/Label"
import {Button} from "../../components/Button"
import firebase from "../../../firebase"
import {useCreatePost, Post} from "../../hooks/posts/useCreatePost"
import {navigate} from "../../../RootNavigation"
import {useContext} from "react"
import {UserContext} from "../../context/UserContext"

/**
 * screen to create a new post
 *
 * @returns {View} `create-post` screen
 */
export default ({route, navigation}: CameraNavProps<"newPost">) => {
  const {photo} = route.params
  const {user} = useContext(UserContext)
  const [caption, setCaption] = useState<string>()
  const [shopId, setShopId] = useState<string>()
  const [error, setError] = useState<string>()
  const {create, isLoading, progress} = useCreatePost()

  //handles the button onPress event and saves the post to firebase
  const onSubmit = async () => {
    setError("")
    try {
      const post: Partial<Post> = {
        uid: user!.uid,
        username: user!.username!,
        caption: caption || "",
        shopId: caption || "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
      //save post to firebase
      await create(post, photo.uri)
      //close the modal
      navigate("feed")
    } catch ({message}) {
      setError(message)
    }
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      stickyHeaderIndices={[0]}
      bounces={false}>
      <View style={tailwind("relative h-64")}>
        <Image source={photo} style={tailwind("absolute w-full h-64")}></Image>
        <View>
          <TouchableOpacity
            style={tailwind("p-4")}
            onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-arrow-back"
              size={32}
              style={tailwind("text-gray-200")}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tailwind("px-4 py-2")}>
        <Label>Caption</Label>
        <Text style={tailwind("text-gray-600 mb-3 text-sm")}>
          You can tag people in this picture by typing the `@`-sign, followed by
          their name.
        </Text>
        <TextInput
          value={caption}
          onChangeText={text => setCaption(text)}
          style={tailwind(
            "py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
          )}
          multiline={true}
          autoCapitalize="sentences"></TextInput>
        <Label>Shop</Label>
        <Text style={tailwind("text-gray-600 mb-3 text-sm")}>
          Select the shop you took this amazing shop at! It may appear in the
          shop´s timeline.
        </Text>
        <Picker
          onValueChange={value => setShopId(value)}
          selectedValue={shopId}>
          <Picker.Item label="shop A" value="shopAId"></Picker.Item>
          <Picker.Item label="shop B" value="shopBId"></Picker.Item>
          <Picker.Item label="shop C" value="shopCId"></Picker.Item>
        </Picker>
        <Button
          onPress={onSubmit}
          disabled={isLoading}
          style={tailwind("bg-black my-4")}>
          <Text style={tailwind("font-medium text-white")}>Share</Text>
        </Button>
        {error ? <ErrorLabel>{error}</ErrorLabel> : null}
        {isLoading ? (
          <View style={tailwind("w-full flex")}>
            <Bar progress={progress} width={null}></Bar>
            <Text style={tailwind("p-2 text-center text-gray-600")}>
              {progress ? progress * 100 : null}%
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  )
}
