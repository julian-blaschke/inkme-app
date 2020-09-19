import {createRef} from "react"
import {AuthParamList} from "./src/navigation/AuthNavigator"
import {CameraParamList} from "./src/navigation/CameraNavigator"
import {FeedParamList} from "./src/navigation/FeedNavigator"
import {HomeParamList} from "./src/navigation/HomeNavigator"
import {NavigationContainerRef} from "@react-navigation/native"

type ParamList = AuthParamList & CameraParamList & FeedParamList & HomeParamList

export const navigationRef = createRef<NavigationContainerRef>()

export function navigate(name: keyof ParamList) {
  navigationRef.current?.navigate(name)
}
