import * as React from "react"
import {View, Text} from "react-native"
import tailwind from "tailwind-rn"
import {TouchableOpacity} from "react-native-gesture-handler"
import {StatsticProps, Statistics} from "../../components/Statistics"
import {Avatar} from "../../components/Avatar"
import {Shops, ShopProps} from "../../components/Shop"

/**
 * Shows all information of the currently logged in user, such as
 * subscriber, subscription & post consts
 * avatar and Biography
 * shops & guestspots this user has worked/ is working at
 * all posts this user has posted/is associated with
 * options to change any of the given information
 *
 * @returns screen for my profile
 */
export default () => {
  const statistics: StatsticProps[] = [
    {count: 5043, label: "subscriptions"},
    {count: 145, label: "subscribers"},
    {count: 562, label: "posts"},
  ]
  const shops: ShopProps[] = [
    {name: "TheShire", role: "owner"},
    {name: "Moria", role: "apprentice"},
  ]
  return (
    <View>
      <View style={tailwind("p-4")}>
        <Statistics {...{statistics}}></Statistics>
        <View style={tailwind("py-4 mt-4 flex items-center")}>
          <Avatar style={tailwind("h-20 w-20 border-4")}></Avatar>
          <Text style={tailwind("mt-2 text-gray-700")}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat.
          </Text>
        </View>
        <View>
          <View style={tailwind("flex flex-row justify-between")}>
            <Text style={tailwind("text-2xl font-semibold")}>
              Shops & Guestspots
            </Text>
            <TouchableOpacity>
              <Text style={tailwind("text-gray-500")}>see all</Text>
            </TouchableOpacity>
          </View>
          <Shops shops={shops}></Shops>
        </View>
        <View>
          <Text style={tailwind("mt-6 text-2xl font-semibold")}>Posts</Text>
        </View>
      </View>
    </View>
  )
}
