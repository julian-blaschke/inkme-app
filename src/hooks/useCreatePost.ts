import {useState, useReducer} from "react"
import {firestore, storage} from "../../firebase"
import {useImageUpload} from "./useImageUpload"

export interface Post {
  uid: string
  username: string
  caption?: string
  shopId?: string
  mentions?: string
  downloadURL: string
  createdAt: firebase.firestore.FieldValue
}

const defaultPost: Partial<Post> = {
  caption: "",
  shopId: "",
}

/**
 * provides functionality and state management to save a new post
 *
 * @returns function to upload post, progress of image upload, if the process is loading
 */
export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const {upload, progress} = useImageUpload()

  /**
   * function to save a post to firebase. The media supplied will be
   * uploaded to firebase storage, and the post metadata written to cloud
   * firestore (with the downloadURL of the uploaded media).
   *
   * @param {Post} post metadata for the post
   * @param {string} uri path to the image to upload
   */
  const create = async (post: Partial<Post>, uri: string) => {
    setIsLoading(true)
    try {
      //upload image to firebase storage
      const downloadURL = await upload(uri)
      //write object to cloud firestore
      return firestore
        .collection("posts")
        .add({...defaultPost, ...post, downloadURL})
    } catch (error) {
      //TODO: log create post error to firebase crashlytics
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  return {create, isLoading, progress}
}
