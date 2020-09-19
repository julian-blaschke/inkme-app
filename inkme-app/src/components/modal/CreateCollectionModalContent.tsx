import React, {useContext, useMemo, useState} from "react"
import {Text, TextInput, View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"
import {UserContext} from "../../context/UserContext"
import {useCreateCollection} from "../../hooks/posts/useCollections"
import {ErrorLabel} from "../Label"

export const CreateCollectionModalContent: React.FC = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const label = useMemo<string>(() => {
    if (name) return `"${name}"`
    return "a new Collection"
  }, [name])

  const {create, isLoading} = useCreateCollection()
  const {user} = useContext(UserContext)

  const onSubmit = async () => {
    try {
      await create({uid: user!.uid, name})
    } catch ({message}) {
      setError(message)
    }
  }

  return (
    <View style={tailwind("p-4 w-full bg-gray-100 rounded-lg")}>
      <View style={tailwind("py-4")}>
        <View
          style={tailwind(
            "flex flex-row justify-between items-center flex-wrap"
          )}>
          <Text style={tailwind("text-xl font-semibold")}>Create {label}</Text>
          <TouchableOpacity disabled={isLoading} onPress={onSubmit}>
            <Text style={tailwind("")}>Create</Text>
          </TouchableOpacity>
        </View>
        <Text style={tailwind("mt-2 text-sm font-light text-gray-500")}>
          Save Posts you like to a collection to save them for later
        </Text>
      </View>
      <View style={tailwind("my-4")}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={tailwind(
            "my-2 py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
          )}
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="create"
          onSubmitEditing={onSubmit}
          placeholder="shop name"></TextInput>
      </View>
      <ErrorLabel>{error}</ErrorLabel>
    </View>
  )
}
