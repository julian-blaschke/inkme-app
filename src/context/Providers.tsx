import * as React from "react"
import {UserProvider} from "./UserContext"

export const Providers: React.FC = ({children}) => {
  return <UserProvider>{children}</UserProvider>
}
