import {useState} from "react"
import firebase from "firebase"
import {firestore} from "../../../firebase"

export const useSubscribe = () => {
  const [isLoading, setLoading] = useState(false)
  type Subscription = {subscriberId: string; subscriptionId: string}

  const subscribe = async ({
    subscriberId,
    subscriptionId,
  }: Partial<Subscription>) => {
    setLoading(true)
    try {
      if (!subscriberId) throw new Error("invalid subscriber Id")
      if (!subscriptionId) throw new Error("invalid subscription Id")
      const subscriptionRef = firestore
        .collection("subscriptions")
        .doc(subscriptionId)
      return subscriptionRef.set({
        subscribers: firebase.firestore.FieldValue.arrayUnion(subscriberId),
      })
    } finally {
      setLoading(false)
    }
  }
  return {subscribe, isLoading}
}
