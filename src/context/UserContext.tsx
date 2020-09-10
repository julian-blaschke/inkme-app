import React, {useState, useCallback} from "react"
import {createContext} from "react"
import {User} from "../hooks/auth/useUser"

export type UserContextState = {
  user?: User
  setUser: (user: User) => void
}

const defaultState: UserContextState = {setUser: () => null}

export const UserContext = createContext<UserContextState>(defaultState)

/**
 *
 * @param
 */
export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User>()
  const calllback = useCallback((user: User) => {
    return setUser(user)
  }, [])
  return (
    <UserContext.Provider value={{user, setUser: calllback}}>
      {children}
    </UserContext.Provider>
  )
}
