import * as React from "react"
import {View, Text} from "react-native"
import tailwind from "tailwind-rn"

export interface StatsticProps {
  count: number
  label: "subscribers" | "subscriptions" | "posts"
}

/**
 * shows user`s information
 *
 * @param count number of the specific statistic
 * @param label label for the statistic ("subscribers","subscriptions","posts")
 * @returns statstic component showing the count and label of this statistic
 */
export const Statistic = ({count, label}: StatsticProps) => (
  <View style={tailwind("flex items-center")}>
    <Text style={tailwind("text-lg font-bold ")}>{count}</Text>
    <Text style={tailwind("mt-2 text-xs text-gray-500 uppercase font-medium ")}>
      {label}
    </Text>
  </View>
)

/**
 * shows multiple statistic components
 *
 * @param statistic array of count-label-pairs
 * @returns statistics component as a view
 */
export const Statistics: React.FC<{statistics: StatsticProps[]}> = ({
  statistics,
}) => (
  <View style={tailwind("flex flex-row justify-between")}>
    {statistics.map((statistic, i) => (
      <Statistic key={i} {...statistic}></Statistic>
    ))}
  </View>
)
