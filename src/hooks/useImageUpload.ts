import {useReducer} from "react"
import {storage} from "../../firebase"

type UploadState = {
  isLoading: boolean
  progress?: number
}

type UploadActions =
  | {type: "initialize" | "finish"}
  | {type: "progress"; progress: number}

const reducer = (state: UploadState, action: UploadActions): UploadState => {
  switch (action.type) {
    case "initialize":
      return {isLoading: true}
    case "progress":
      return {...state, progress: action.progress}
    case "finish":
      return {...state, isLoading: false}
    default:
      return state
  }
}

const initialState: UploadState = {
  isLoading: false,
}

/**
 * handles all state related to the image upload
 *
 * @returns upload function to call, and
 */
export const useImageUpload = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * handles all logic to upload image to firebase storage
   *
   * @param {string} uri path to the image to upload
   * @returns {string} the downloadURL of the just uploaded image
   */
  const upload = async (uri: string): Promise<string> => {
    try {
      dispatch({type: "finish"})
      //get raw image
      const response = await fetch(uri)
      const blob = await response.blob()
      //upload to firebase storage
      const filename = uri.replace(/^.*[\\\/]/, "")
      const storageRef = storage.ref(`posts/images/${filename}`)
      const uploadTask = storageRef.put(blob)
      //manage upload
      const downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          ({bytesTransferred, totalBytes}) => {
            //compute progress
            const progress =
              Math.round((bytesTransferred / totalBytes) * 100) / 100
            //update state with progress
            return dispatch({type: "progress", progress})
          },
          err => reject(err),
          () =>
            //on completed resolve with path to this uploaded image
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadURL => resolve(downloadURL))
        )
      })
      return downloadURL as string
    } catch (error) {
      //TODO: log image upload error to crashlytics
      throw error
    } finally {
      dispatch({type: "finish"})
    }
  }
  return {...state, upload}
}
