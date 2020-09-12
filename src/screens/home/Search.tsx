import React from "react"
import {SafeAreaView} from "react-native"
import tailwind from "tailwind-rn"
import {DiscoverNavProps} from "../../navigation/DiscoverNavigator"
import {useSearchResults} from "../../hooks/search/useSearchResults"
import {SearchResult} from "../../components/search/SearchResult"

export default ({route}: DiscoverNavProps<"search">) => {
  const results = useSearchResults(route.params?.input)
  return (
    <SafeAreaView style={tailwind("mt-4")}>
      {results
        ? results.map(result => (
            <SearchResult key={result.id} {...result}></SearchResult>
          ))
        : null}
    </SafeAreaView>
  )
}
