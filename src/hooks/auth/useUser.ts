import {useEffect, useReducer, useRef} from "react"
import {auth, firestore} from "../../../firebase"
import {docData} from "rxfire/firestore"
import {Subscription} from "rxjs"

export interface User extends firebase.User {
  username?: string
  subscribersCount: number
  subscriptionsCount: number
}

export type AuthState =
  | {
      isLoading: true
      isLoggedIn?: boolean
      isInFirestore?: boolean
      user?: firebase.User | User
    }
  | {
      isLoading: false
      isLoggedIn?: false
    }
  | {
      isLoggedIn: true
      isLoading: false
      isInFirestore: false
      user: firebase.User
    }
  | {isLoggedIn: true; isLoading: false; isInFirestore: true; user: User}

type Action =
  | {type: "initialize" | "loggedOut"}
  | {type: "login"; user: firebase.User}
  | {type: "firestoreDoc"; user: User}

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "initialize":
      return {...state, isLoading: true}
    case "loggedOut":
      return {isLoading: false, isLoggedIn: false}
    case "login":
      return {
        isLoading: false,
        isInFirestore: false,
        isLoggedIn: true,
        user: action.user,
      }
    case "firestoreDoc":
      return {
        isLoading: false,
        isInFirestore: true,
        isLoggedIn: true,
        user: action.user,
      }
    default:
      return state
  }
}

const initialState: AuthState = {isLoading: true}

/**
 * if a user is signed into firebase authentication, pull information of this user
 * from firestore
 *
 * @returns {User} data of the currently signed in user
 */
export const useUser = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const firestoreSubscription = useRef<Subscription>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = firestore.collection("users").doc(user.uid)
        firestoreSubscription.current = docData(userRef).subscribe(
          (userData: any) => {
            if (userData) {
              dispatch({type: "firestoreDoc", user: {...user, ...userData}})
            } else {
              dispatch({type: "login", user})
            }
          }
        )
      } else dispatch({type: "loggedOut"})
    })
    return () => {
      if (firestoreSubscription.current)
        firestoreSubscription.current.unsubscribe()
      unsubscribe()
    }
  }, [])

  return state
}
