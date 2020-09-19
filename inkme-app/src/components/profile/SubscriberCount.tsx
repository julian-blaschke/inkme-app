import * as React from "react"
import {View, Text} from "react-native"
import tailwind from "tailwind-rn"

export interface SubscriberCountProps {
  label: string
  value: number
}

/**
 * Component to render a formatted key-value stacked on top of eachother
 *
 * @param {string} label the label for the value parameter
 * @param {number} value
 * @returns {View} the label-value pair, stacked on top of eachother
 */
export const SubscriberCount: React.FC<SubscriberCountProps> = ({
  label,
  value,
}) => (
  <View style={tailwind("flex items-center")}>
    <Text style={tailwind("text-2xl font-medium")}>{value}</Text>
    <Text style={tailwind("uppercase text-xs font-light text-gray-600")}>
      {label}
    </Text>
  </View>
)
