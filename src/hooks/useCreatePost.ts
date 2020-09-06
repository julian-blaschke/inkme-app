import {useState} from "react"
import {firestore, storage} from "../../firebase"

export interface Post {
  user: {
    uid: string
    username: string
  }
  caption?: string
  shopId?: string
  photoUrl: string
  createdAt: firebase.firestore.FieldValue
}

export const useCreatePost = () => {
  const [isFetching, setIsFetching] = useState<boolean>()
  const [error, setError] = useState<string>()
  const [progress, setProgress] = useState<number>()

  const create = async (post: Post, uri: string) => {
    setIsFetching(true)
    setError("")
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      const uploadTask = storage.ref(`post_images/${uri}`).put(blob)

      const downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          snapshot => {
            return setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ) / 100
            )
          },
          err => setError(err.message),
          () =>
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => resolve(downloadURL))
        )
      })
      post.photoUrl = downloadURL as string
      return firestore.collection("posts").add(post)
    } catch ({message}) {
      setError(message)
    } finally {
      setIsFetching(false)
    }
  }
  return {create, isFetching, error, progress}
}
