import React, {useRef, useEffect} from "react"
import {TextInput} from "react-native"
import tailwind from "tailwind-rn"
import {AntDesign} from "@expo/vector-icons"
import {Subject} from "rxjs"
import {debounceTime, tap} from "rxjs/operators"
import {StackNavigationProp} from "@react-navigation/stack"
import {DiscoverParamList} from "../../navigation/DiscoverNavigator"

interface SearchInputProps {
  navigation: StackNavigationProp<DiscoverParamList, "search">
}

export const SearchInput: React.FC<SearchInputProps> = ({navigation}) => {
  const subject = useRef(new Subject<string>())
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    inputRef.current?.focus()
    subject.current
      .pipe(debounceTime(1000))
      .subscribe(input => navigation.setParams({input}))
  }, [])

  return (
    <TextInput
      ref={inputRef}
      style={tailwind("h-8 p-2 bg-gray-300 rounded-lg")}
      placeholder="Search"
      autoCapitalize="none"
      onChange={event =>
        subject.current.next(event.nativeEvent.text)
      }></TextInput>
  )
}
