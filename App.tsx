import * as React from "react"
import {NavigationContainer} from "@react-navigation/native"
import AuthNavigator from "./src/navigation/AuthNavigator"
import useUser from "./src/hooks/auth/useUser"
import HomeNavigator from "./src/navigation/HomeNavigator"

export default function App() {
  const user = useUser()
  return (
    <NavigationContainer>
      {user ? <HomeNavigator></HomeNavigator> : <AuthNavigator></AuthNavigator>}
    </NavigationContainer>
  )
}
