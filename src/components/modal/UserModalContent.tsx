import React from "react"
import {Text, View} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import tailwind from "tailwind-rn"
import {User} from "../../hooks/auth/useUser"
import {SubscriberCount} from "../profile/SubscriberCount"

interface UserModalProps {
  user?: User
  close?: () => void
}

export const UserModalContent: React.FC<UserModalProps> = ({user, close}) => {
  //TODO: add shop & guestspot information
  return (
    <View style={tailwind("p-4 w-full bg-gray-100 rounded-lg")}>
      <View style={tailwind("flex flex-row justify-between items-center")}>
        <Text style={tailwind("text-2xl font-semibold")}>Working @</Text>
        <Text style={tailwind("text-sm font-light text-gray-600 underline")}>
          see all
        </Text>
      </View>
      <View
        style={tailwind("mt-10 flex flex-row justify-between items-center")}>
        <Text style={tailwind("text-2xl font-semibold")}>Guest Spots </Text>
        <Text style={tailwind("text-sm font-light text-gray-600 underline")}>
          see all
        </Text>
      </View>
    </View>
  )
}
