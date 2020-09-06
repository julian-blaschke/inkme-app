import React, {useState} from "react"
import {View, Image, Text, Picker} from "react-native"
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"
import {Ionicons} from "@expo/vector-icons"
import {CameraNavProps} from "../../navigation/CameraNavigator"
import {Label, ErrorLabel} from "../../components/Label"
import {Button} from "../../components/Button"
import firebase from "../../../firebase"
import {useUser} from "../../hooks/auth/useUser"
import {useCreatePost, Post} from "../../hooks/useCreatePost"
import {Bar} from "react-native-progress"
import {navigate} from "../../../RootNavigation"

export default ({route, navigation}: CameraNavProps<"newPost">) => {
  const {photo} = route.params
  const {user} = useUser()
  const [caption, setCaption] = useState<string>("")
  const [shopId, setShopId] = useState<string>()
  const {create, error, isFetching, progress} = useCreatePost()

  const onSubmit = async () => {
    const post: Post = {
      user: {
        uid: user!.uid,
        username: user!.username!,
      },
      caption: caption || "",
      shopId: shopId || "",
      photoUrl: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    await create(post, photo.uri)
    navigate("feed")
  }

  return (
    <View style={tailwind("w-full")}>
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
      <ScrollView
        style={tailwind("px-4 py-2")}
        keyboardShouldPersistTaps="never"
        scrollEnabled={false}>
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
          style={tailwind("bg-black my-4")}
          disabled={isFetching}>
          <Text style={tailwind("font-medium text-white")}>Share</Text>
        </Button>
        <ErrorLabel>{error}</ErrorLabel>
        {isFetching ? (
          <View style={tailwind("w-full flex")}>
            <Bar progress={progress} width={null}></Bar>
            <Text style={tailwind("p-2 text-center text-gray-600")}>
              {progress ? progress * 100 : null}%
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}
