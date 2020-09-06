import * as React from "react"
import {View} from "react-native"
import tailwind from "tailwind-rn"
import {Avatar} from "../../components/Avatar"
import {useUser} from "../../hooks/auth/useUser"

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
    <View style={tailwind("mt-10")}>
      <View style={tailwind("p-4")}>
        <View style={tailwind("py-4 mt-4 flex items-center")}>
          <Avatar
            photoURL={user?.photoURL}
            style={tailwind("h-20 w-20 border-4")}></Avatar>
        </View>
      </View>
    </View>
  )
}
