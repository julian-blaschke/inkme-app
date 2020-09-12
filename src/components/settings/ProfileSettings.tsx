import * as React from "react"
import {TouchableOpacity} from "react-native-gesture-handler"
import {AntDesign} from "@expo/vector-icons"
import {Setting} from "./Setting"
import {useSignOut} from "../../hooks/auth/useSignOut"

export function ProfileSettings() {
  const signOut = useSignOut()
  return (
    <>
      {/** Edit Profile */}
      <TouchableOpacity>
        <Setting name="Edit Profile" iconName="user">
          <AntDesign name="right" size={16}></AntDesign>
        </Setting>
      </TouchableOpacity>
      {/** Change Password */}
      <TouchableOpacity>
        <Setting name="Change Password" iconName="lock">
          <AntDesign name="right" size={16}></AntDesign>
        </Setting>
      </TouchableOpacity>
      {/** Logout */}
      <TouchableOpacity onPress={signOut}>
        <Setting name="Sign Out" iconName="logout"></Setting>
      </TouchableOpacity>
    </>
  )
}
