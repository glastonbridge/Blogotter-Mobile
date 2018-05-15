import {GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase';


export const getPostList = () => {
  return new Promise((res,rej) =>{
    firebase.database().ref('posts')
    .once('value', function(posts) {
      var results = posts.val();
      if (!results) {
        res([]);
        return;
      }
      res(Object.keys(results).map(k=>{
        return {
          key: k,
          title: results[k].title
        };
      }));
    });
  });
};

export const initDataModel = () => {
  return GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/firebase"], // TODO: is this necessary or are firebase rules sufficient (seems like a security issue)
    iosClientId: "905720101265-vvgstdqc3p4orjt1760t3s2pmh2ieieb.apps.googleusercontent.com",
    webClientId: "905720101265-mum0l50fqlu99uq9p9ah146jt33l9uek.apps.googleusercontent.com"
  })
  .then(() => GoogleSignin.currentUserAsync())
  .then((user) => {
    if (!user) {
      return GoogleSignin.signIn();
    } else {
      return user;
    }
  })
  .then(user=>{
    let credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
    // login with credential
    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
  });
};

export const getPost = (postId) => {
  return new Promise((res,rej)=> {
    firebase.database().ref('posts').child(postId)
    .once('value',(post) => {
      post=post.val();
      res({
        title: post.title,
        text: post.body
      });
    });
  });
};

export const savePost = (postId, newTitle, newBody) => {
  firebase.database().ref('posts').child(postId)
  .set({
    title: newTitle,
    body: newBody
  });
};
