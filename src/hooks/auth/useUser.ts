import {useEffect, useState} from "react"
import {auth, firestore} from "../../../firebase"
import {docData} from "rxfire/firestore"

export interface User extends firebase.User {
  username?: string
}

/**
 * subscribe to the onAuthStateChanged firebase observable,
 * to check if there is a user logged in
 *
 * @returns {boolean} if there is a user signed in
 */
export const useAuthState = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => setIsLoggedIn(!!user))
    return () => unsubscribe()
  }, [])

  return isLoggedIn
}

/**
 * if a user is signed into firebase authentication, pull information of this user
 * from firestore
 *
 * @returns {User} data of the currently signed in user
 */
export const useUser = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [user, setUser] = useState<User>()
  const isLoggedIn = useAuthState()

  //if there is a user, go get to firestore
  useEffect(() => {
    setIsFetching(true)
    if (isLoggedIn) {
      const userRef = firestore.collection("users").doc(auth.currentUser?.uid)
      const subscription = docData(userRef).subscribe((user: any) => {
        console.log(user)
        setUser({...auth.currentUser, ...user})
      })
      return () => subscription.unsubscribe()
    }
    setIsFetching(false)
  }, [isLoggedIn])

  return {user, isFetching}
}
