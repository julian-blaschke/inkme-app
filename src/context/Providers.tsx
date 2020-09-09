import * as React from "react"
import {AuthProvider} from "./AuthContext"
import {UserProvider} from "./UserContext"

export const Providers: React.FC = ({children}) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}
