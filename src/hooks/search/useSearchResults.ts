import {useState, useEffect} from "react"
import {collectionData} from "rxfire/firestore"
import {firestore} from "../../../firebase"

export interface Result {
  id: string
  username: string
  photoURL?: string
}

export const useSearchResults = (search: string) => {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    if (search) {
      const usersRef = firestore
        .collection("users")
        .where("username", ">=", search)
        .where("username", "<=", search + "\uf8ff")
      const subscription = collectionData(
        usersRef,
        "id"
      ).subscribe((users: any) => setResults(users))
      return () => subscription.unsubscribe()
    }
  }, [search])
  return results
}
