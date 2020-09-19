import {useState, useEffect} from "react"
import {docData} from "rxfire/firestore"
import {User} from "./useUser"
import {firestore} from "../../../firebase"

export const useOtherUser = (uid: string) => {
  const [user, setUser] = useState<User>()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    setIsFetching(true)
    const userRef = firestore.collection("users").doc(uid)
    const subscription = docData(userRef, "uid").subscribe((data: any) => {
      if (data) {
        setUser(data)
      } else {
        setError("user not found :(")
      }
      setIsFetching(false)
      return () => subscription.unsubscribe()
    })
  }, [uid])
  return {user, isFetching, error}
}
