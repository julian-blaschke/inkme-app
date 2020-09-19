import * as React from "react"
import {createContext} from "react"
import {useUser, AuthState} from "../hooks/auth/useUser"

export const AuthContext = createContext<AuthState>({isLoading: false})

export const AuthProvider: React.FC = ({children}) => {
  const state = useUser()
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
