import * as React from "react"
import {Text, ScrollView} from "react-native"
import tailwind from "tailwind-rn"
import {ProfileSettings} from "../../components/settings/ProfileSettings"
import {GeneralSettings} from "../../components/settings/GeneralSettings"
import {DangerZoneSettings} from "../../components/settings/DangerSettings"

const SubHeader: React.FC<{title: string}> = ({title}) => {
  return (
    <Text
      style={tailwind("my-2 text-gray-600 uppercase text-xs font-semibold")}>
      {title}
    </Text>
  )
}

/**
 * returnes the screen to adjust settings for the logged-in user
 *
 * @returns the settings-screen
 */
export default () => {
  return (
    <ScrollView style={tailwind("p-4 px-6")} stickyHeaderIndices={[0, 2, 4]}>
      <SubHeader title="profile"></SubHeader>
      <ProfileSettings />
      <SubHeader title="general"></SubHeader>
      <GeneralSettings />
      <SubHeader title="danger"></SubHeader>
      <DangerZoneSettings />
    </ScrollView>
  )
}
