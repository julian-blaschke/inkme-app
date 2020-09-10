import * as React from "react"
import {NavigationContainer} from "@react-navigation/native"
import AuthNavigator from "./src/navigation/AuthNavigator"
import HomeNavigator from "./src/navigation/HomeNavigator"
import {ActivityIndicator, View} from "react-native"
import ChooseUsername from "./src/screens/auth/ChooseUsername"
import {navigationRef} from "./RootNavigation"
import {Providers} from "./src/context/Providers"
import {AuthContext} from "./src/context/AuthContext"
import tailwind from "tailwind-rn"
import {UserContext} from "./src/context/UserContext"

/**
 * depending on the authentication state of the user (loggedIn, loggedIn & saved in firestore
 * or loggedout) the appropriate navigator
 *
 * @returns the current screen/navigator
 */
const CurrentNavigator: React.FC = () => {
  const state = React.useContext(AuthContext)
  const {setUser} = React.useContext(UserContext)
  if (state.isLoading) {
    return (
      <View style={tailwind("w-full h-full flex justify-center items-center")}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    )
  } else if (state.isLoggedIn) {
    setUser(state.user)
    if (state.isInFirestore) {
      return <HomeNavigator></HomeNavigator>
    } else {
      return <ChooseUsername></ChooseUsername>
    }
  } else {
    return <AuthNavigator></AuthNavigator>
  }
}

export default function App() {
  return (
    <Providers>
      <NavigationContainer ref={navigationRef}>
        <CurrentNavigator></CurrentNavigator>
      </NavigationContainer>
    </Providers>
  )
}
