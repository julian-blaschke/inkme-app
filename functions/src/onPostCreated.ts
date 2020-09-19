import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onPostCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate((snapshot, context) => {
    const postData = snapshot.data();
    console.log("post id : " + postData.uid);
    if (!postData) return null;
    const minifiedPost = {
      id: snapshot.id,
      caption: postData.caption,
      downloadURL: postData.downloadURL,
      createdAt: postData.createdAt,
    };
    return admin
      .firestore()
      .doc(`subscriptions/${postData.uid}`)
      .update({
        recentPosts: admin.firestore.FieldValue.arrayUnion(minifiedPost),
      });
  });
