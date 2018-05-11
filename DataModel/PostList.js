export default getPostList = () => {
  // Todo: replace with Firebase calls
  return new Promise((res, rej) => {
    res([{
      key:"123",
      title: "See saw"
    },{
      key:"456",
      title: "George Dawes"
    }]);
  });
};

export const getPost = (postId) => {
  return new Promise((res,rej)=> {
    res({text: "Johnny shall have a <b>new</b> master."});
  });
};

export const savePost = (postId, newTitle, newBody) => {
  console.log("Successfully got a new post");
}
