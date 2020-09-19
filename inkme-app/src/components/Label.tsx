import * as React from "react"
import {Text} from "react-native"
import tailwind from "tailwind-rn"

/**
 * component to label a textinput
 *
 * @returns label component as text
 */
export const Label: React.FC = ({children}) => {
  return <Text style={tailwind("py-2 text-xl font-semibold")}>{children}</Text>
}

export const ErrorLabel: React.FC = ({children}) => {
  return <Text style={tailwind("text-red-500 mt-1")}>{children}</Text>
}
