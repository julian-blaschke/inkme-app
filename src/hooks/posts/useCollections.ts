import {useEffect, useState} from "react"
import {collectionData} from "rxfire/firestore"
import {tap} from "rxjs/operators"
import {firestore} from "../../../firebase"

export interface Collection {
  id?: string
  uid: string
  name: string
  postsCount?: number
}

export const useCollections = (uid: string) => {
  const [collections, setCollections] = useState<Collection[]>()

  useEffect(() => {
    const collectionsRef = firestore
      .collection("collections")
      .where("uid", "==", uid)
    collectionData(collectionsRef, "id")
      .pipe(tap(() => console.log("something rerendered" + uid)))
      .subscribe((data: any) => setCollections(data))
  }, [uid])

  return collections
}

export const useCreateCollection = () => {
  const [isLoading, setIsLoading] = useState(false)

  const create = async ({uid, name}: Collection) => {
    try {
      setIsLoading(true)
      const result = await firestore.collection("collections").add({uid, name})
      return result
    } finally {
      setIsLoading(false)
    }
  }
  return {create, isLoading}
}
