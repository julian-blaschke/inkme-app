import {useEffect, useState} from "react"
import {collectionData} from "rxfire/firestore"
import {reduce, tap} from "rxjs/operators"
import {firestore} from "../../../firebase"
import {Post} from "./usePosts"

export const useFeed = (uid?: string) => {
  const [posts, setPosts] = useState<Post[]>()

  useEffect(() => {
    if (uid) {
      const postsRef = firestore
        .collection("subscriptions")
        .where("subscribers", "array-contains", uid)
        .limit(10)
      const subscription = collectionData(postsRef).subscribe((data: any) => {
        setPosts(
          data.reduce((acc: any, val: any) => acc.concat(val.recentPosts), [])
        )
      })
      return () => subscription.unsubscribe()
    }
  }, [uid])

  return posts
}
