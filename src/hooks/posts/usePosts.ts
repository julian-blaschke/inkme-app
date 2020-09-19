import {useState, useEffect} from "react"
import {collectionData} from "rxfire/firestore"
import {firestore} from "../../../firebase"

interface Post {
  id: string
  downloadURL: string
}

/**
 * hook to fetch all posts of a user from firestore
 *
 * @param {string} uid the user`s id to fetch the posts of
 * @returns {Post[]} posts array
 */
export const usePosts = (uid: string) => {
  const [posts, setPosts] = useState<Post[]>()
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    setIsFetching(true)
    const postsRef = firestore
      .collection("posts")
      .where("uid", "==", uid)
      .limit(3)
    const subscription = collectionData(postsRef, "id").subscribe(
      (posts: any) => {
        setPosts(posts)
        setIsFetching(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [uid])

  return {isFetching, posts}
}

/**
 *
 *
 * @param {string} id of the collection to get the posts from
 */
export const useCollectionPosts = (id: string) => {
  const [posts, setPosts] = useState<Post>()

  useEffect(() => {
    const postRef = firestore
      .collection("collection")
      .doc(id)
      .collection("posts")
    const subscription = collectionData(postRef, "id").subscribe((posts: any) =>
      setPosts(posts)
    )
    return () => subscription.unsubscribe()
  }, [id])

  return posts
}
