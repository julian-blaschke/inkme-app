import * as React from "react"
import {NavigationContainer} from "@react-navigation/native"
import AuthNavigator from "./src/navigation/AuthNavigator"
import HomeNavigator from "./src/navigation/HomeNavigator"
import {useAuthState, useUser} from "./src/hooks/auth/useUser"
import {ActivityIndicator} from "react-native"
import ChooseUsername from "./src/screens/auth/ChooseUsername"

const CurrentNavigator = () => {
  const isLoggedIn = useAuthState()
  const {user, isFetching} = useUser()

  if (isFetching && !isLoggedIn) {
    return <ActivityIndicator></ActivityIndicator>
  } else if (isLoggedIn && user?.username) {
    return <HomeNavigator></HomeNavigator>
  } else if (isLoggedIn) {
    return <ChooseUsername></ChooseUsername>
  } else {
    return <AuthNavigator></AuthNavigator>
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <CurrentNavigator></CurrentNavigator>
    </NavigationContainer>
  )
}
