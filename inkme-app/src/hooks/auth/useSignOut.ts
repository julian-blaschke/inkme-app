import {Alert} from "react-native"
import {auth} from "../../../firebase"

export const useSignOut = () => {
  return () => {
    Alert.alert(
      "Are you sure you want to sign out?",
      "signing out will redirect you to the sign-in-screen. You can then sign in again.",
      [
        {text: "cancel", style: "cancel"},
        {text: "sign out", style: "default", onPress: () => auth.signOut()},
      ]
    )
  }
}
