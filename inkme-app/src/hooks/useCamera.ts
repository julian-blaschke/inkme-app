import {useState, useEffect} from "react"
import {Camera} from "expo-camera"

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  useEffect(() => {
    ;(async () => {
      const {status} = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])
  return hasPermission
}
