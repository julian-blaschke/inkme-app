import {useEffect, useState, useReducer} from "react"
import {auth, firestore} from "../../../firebase"
import {docData} from "rxfire/firestore"
import create from "zustand"

export interface User extends firebase.User {
  username?: string
}

export type AuthState =
  | {
      isLoading: true
      isLoggedIn?: boolean
      hasUsername?: boolean
      user?: firebase.User | User
    }
  | {
      isLoading: false
      isLoggedIn?: false
    }
  | {
      isLoggedIn: true
      isLoading: false
      hasUsername: false
      user: firebase.User
    }
  | {isLoggedIn: true; isLoading: false; hasUsername: true; user: User}

type Action =
  | {type: "initialize" | "loggedOut"}
  | {type: "login"; user: firebase.User}
  | {type: "updateUser"; user: User}

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "initialize":
      return {...state, isLoading: true}
    case "loggedOut":
      return {isLoading: false, isLoggedIn: false}
    case "login":
      return {
        isLoading: false,
        hasUsername: false,
        isLoggedIn: true,
        user: action.user,
      }
    case "updateUser":
      return {
        isLoading: false,
        isLoggedIn: true,
        hasUsername: true,
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) dispatch({type: "login", user})
      else dispatch({type: "loggedOut"})
    })
    return () => unsubscribe()
  }, [])

  //if there is a user, go get to firestore
  useEffect(() => {
    if (state.isLoggedIn) {
      if (!state.isLoading) dispatch({type: "initialize"})
      const userRef = firestore.collection("users").doc(auth.currentUser?.uid)
      const subscription = docData(userRef).subscribe((user: any) => {
        dispatch({type: "updateUser", user: {...auth.currentUser, ...user}})
      })
      return () => subscription.unsubscribe()
    }
  }, [state.isLoggedIn])

  return state
}
