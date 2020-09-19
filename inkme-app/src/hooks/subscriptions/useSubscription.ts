import {useEffect, useState} from "react"
import {docData} from "rxfire/firestore"
import {firestore} from "../../../firebase"

interface Subscription {
  subscriberId: string
  subscriptionId: string
}

export const useSubscription = ({
  subscriberId,
  subscriptionId,
}: Partial<Subscription>) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>()

  useEffect(() => {
    if (subscriptionId && subscriberId) {
      const subscriptionRef = firestore
        .collection("subscriptions")
        .doc(subscriptionId)
      docData(subscriptionRef).subscribe((data: any) => {
        const isSubed = data?.subscribers?.some(
          (subscriber: string) => subscriber === subscriberId
        )
        setIsSubscribed(isSubed)
      })
    }
  }, [subscriptionId, subscriberId])
  return isSubscribed
}
