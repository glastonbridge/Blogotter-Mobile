import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from "./Pages/PostList"
import PostEdit from "./Pages/PostEdit"
import {getPost} from "./DataModel/PostList"

/**
 * For now, the app needs to do the following things:
 *   - Require login
 *   - List blog posts (flatlist page, items from fb)
 *   - create blog post (new button)
 *   - edit blog post (rich text)
 *     -post
*/
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={page: "list"};
  }
  showPost = (postKey) => {

    getPost(postKey).then(post=> {
      let postInfo = {
        title: post.title,
        text: post.text,
        key: postKey
      }
      this.setState({page: "post", postInfo: postInfo});
    });
  }
  showList = () => {
    this.setState({page: "list", postInfo: undefined});
  }
  render() {
    if (this.state.page=="post") {
      return (
        <PostEdit
          postId={this.state.key}
          postTitle={this.state.postInfo.title}
          postText={this.state.postInfo.text}
          goBack={this.showList} />
      )
    } else {
      return (
        <PostList showPost={this.showPost} />
      );
    }
  }
}
