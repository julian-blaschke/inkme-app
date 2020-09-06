import * as React from "react"
import {View, Text} from "react-native"
import tailwind from "tailwind-rn"
import {useUser} from "../../hooks/auth/useUser"
import {Avatar} from "../../components/profile/Avatar"
import {ScrollView} from "react-native-gesture-handler"

/**
 * Shows all information of the currently logged in user, such as
 * subscriber, subscription & post consts
 * avatar and Biography
 * shops & guestspots this user has worked/ is working at
 * all posts this user has posted/is associated with
 * options to change any of the given information
 *
 * @returns screen for my profile
 */
export default () => {
  const {user} = useUser()
  return (
    <View style={tailwind("bg-teal-600 rounded-b-lg")}>
      <View style={tailwind("mt-10 py-4 mt-4 flex items-center")}>
        <Avatar
          photoURL={user?.photoURL}
          style={tailwind("h-20 w-20 border-4")}></Avatar>
        <Text style={tailwind("mt-4 text-3xl font-medium text-gray-100")}>
          @{user?.username}{" "}
        </Text>
        <Text style={tailwind("mt-1 text-base text-gray-400 font-medium")}>
          owner @tatooshop1o1
        </Text>
        <View style={tailwind("mt-10 p-4 w-full flex-row justify-between")}>
          <View style={tailwind("flex items-center")}>
            <Text style={tailwind("text-xl font-bold text-gray-100")}>
              4.3k
            </Text>
            <Text
              style={tailwind("uppercase text-xs font-semibold text-gray-400")}>
              subscribers
            </Text>
          </View>
          <View style={tailwind("flex items-center")}>
            <Text style={tailwind("text-xl font-bold text-gray-100")}>43</Text>
            <Text
              style={tailwind("uppercase text-xs font-semibold text-gray-400")}>
              posts
            </Text>
          </View>
          <View style={tailwind("flex items-center")}>
            <Text style={tailwind("text-xl font-bold text-gray-100")}>248</Text>
            <Text
              style={tailwind("uppercase text-xs font-semibold text-gray-400")}>
              subscriptions
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
