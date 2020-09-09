import * as React from "react"
import {KeyboardAvoidingView, Text, SafeAreaView, View} from "react-native"
import tailwind from "tailwind-rn"
import {Label} from "../../components/Label"
import {Button} from "../../components/Button"
import {Subject} from "rxjs"
import {debounceTime, tap} from "rxjs/operators"
import {TextInput} from "react-native-gesture-handler"
import {firestore} from "../../../firebase"
import {useUser} from "../../hooks/auth/useUser"
import * as yup from "yup"
import {UserContext} from "../../context/UserContext"

const checkUsernameAvailability = async (username: string) => {
  const snapshot = await firestore
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
  return !snapshot.empty
}

const usernameSchema = yup
  .string()
  .required("please enter your username.")
  .min(3, "your username should at least be 3 characters long.")
  .max(20, "your username should not be longer than 20 characters")

/**
 * screen to login with email & password or
 * 3rd party services like Google, Facebook or Apple
 *
 * @returns `login` screen
 */
export default () => {
  const [username, setUsername] = React.useState<string>("")
  //TODO: implement UserContext
  let user = {uid: "test"}

  type State = {type?: "success" | "error"; message?: string}
  const [state, setState] = React.useState<State>({})

  const onChange = React.useRef(new Subject())

  React.useEffect(() => {
    const subscription = onChange.current
      .pipe(
        //reset error/success message onChange
        tap(() => setState({})),
        debounceTime(1000)
      )
      .subscribe(async (debounced: any) => {
        setState({})
        try {
          await usernameSchema.validate(debounced)
          const isTaken = await checkUsernameAvailability(debounced)
          if (isTaken)
            return setState({
              type: "error",
              message: `${debounced} is already taken.`,
            })
          return setState({type: "success", message: `${debounced} is free!`})
        } catch ({message}) {
          setState({type: "error", message})
        }
      })
    return () => subscription.unsubscribe()
  }, [])

  const onSubmit = async () => {
    try {
      await usernameSchema.validate(username)
      const isTaken = await checkUsernameAvailability(username)
      if (isTaken) throw new Error(`${username} is already taken.`)
      await firestore.collection("users").doc(user?.uid).set({username})
    } catch ({message}) {
      setState({type: "error", message})
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={tailwind("p-4")}>
        <Text style={tailwind("text-4xl font-semibold")}>
          Only one step more...
        </Text>
        <View style={tailwind("mt-10")}>
          <Label>Pick Your Username</Label>
          <Text style={tailwind("text-gray-600 mb-3 text-sm")}>
            choose a username for your profile! If you are an artist, you should
            pick the name you are known for, so users can find you when they are
            searching for you or your art.
          </Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            onChange={event => onChange.current.next(event.nativeEvent.text)}
            style={tailwind(
              "py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
            )}
            autoCapitalize="none"
            placeholder="postmalone420"></TextInput>
          <Text
            style={tailwind(
              `my-1 text-sm  ${
                state.type === "error" ? "text-red-500" : "text-green-500"
              }`
            )}>
            {state.message}
          </Text>
          <Button onPress={onSubmit} style={tailwind("bg-black my-4")}>
            <Text style={tailwind("font-medium text-white")}>Claim!</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
