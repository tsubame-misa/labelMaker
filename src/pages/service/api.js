import firebase from "../../config";
export async function getAllData() {
  /*onAuthStateChangedで書いた方が初期時とかにnullが返ってくるバグに遭遇しなくなるらしい。書き方がわからなくて保留 */
  /*firebase.auth().onAuthStateChanged((user) => {
    const db = firebase.firestore();
    db.collection("/users")
      .doc("M0t1g8xjRLQQe6bGaZM9t1dcfPv1")
      .get()
      .then((request) => {
        return request.data;
      });
  });*/

  const user = firebase.auth().currentUser;
  if (user !== null) {
    const db = firebase.firestore();
    const request = await db.collection("/users").doc(user.uid).get();
    const responce = await request.data();
    console.log(responce);
    if (responce !== undefined) {
      return responce.data;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export async function updateData(data) {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  db.collection("users")
    .doc(user.uid)
    .update({
      data: data,
    })
    .then(() => {
      console.log("Document successfully written!");
      return 1;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      return 0;
    });
}

export async function setData2DB(data) {
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  db.collection("users")
    .doc(user.uid)
    .set({
      data: data,
    })
    .then(() => {
      console.log("Document successfully written!");
      return 1;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      return 0;
    });
}
