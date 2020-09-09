import * as React from "react"
import {createContext} from "react"
import {useUser, AuthState} from "../hooks/auth/useUser"

export const UserContext = createContext<AuthState>({isLoading: false})

export const UserProvider: React.FC = ({children}) => {
  const state = useUser()
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}
