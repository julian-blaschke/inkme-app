import React, {useMemo, useRef, useState} from "react"
import {Text, TextInput, View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"
import {Button} from "../Button"

export const CreateShopModalContent: React.FC = () => {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const addressRef = useRef<TextInput>(null)

  const label = useMemo<string>(() => {
    if (name) return `"${name}"`
    return "new Shop"
  }, [name])
  return (
    <View style={tailwind("p-4 w-full bg-gray-100 rounded-lg")}>
      <View style={tailwind("")}>
        <View
          k
          style={tailwind(
            "flex flex-row justify-between items-center flex-wrap"
          )}>
          <Text style={tailwind("text-xl font-semibold")}>Create {label}</Text>
          <TouchableOpacity>
            <Text style={tailwind("")}>Create</Text>
          </TouchableOpacity>
          <Text style={tailwind("mt-2 text-sm font-light text-gray-500")}>
            Save Posts you like to a collection to save them for later
          </Text>
        </View>
      </View>
      <View style={tailwind("my-4")}>
        <TextInput
          onSubmitEditing={() => addressRef.current?.focus()}
          value={name}
          onChangeText={setName}
          style={tailwind(
            "my-2 py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
          )}
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          placeholder="shop name"></TextInput>
        <TextInput
          ref={addressRef}
          value={address}
          onChangeText={setAddress}
          style={tailwind(
            "my-2 py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
          )}
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="create"
          placeholder="address"></TextInput>
      </View>
    </View>
  )
}
