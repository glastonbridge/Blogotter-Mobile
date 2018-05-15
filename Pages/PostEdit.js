import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {RichTextEditor} from 'react-native-zss-rich-text-editor';

import {getPost, savePost} from "../DataModel/PostList"

export default class PostEdit extends React.Component {
  postRef;
  constructor(newProps) {
    super(newProps);
    this.state = {bodyText : ""}
    this.postRef = React.createRef();
  }

  cancel = () => {
    this.props.goBack();
  }
  save = () => {
    this.postRef.current.getContentHtml()
    .then(body => {
      this.postRef.current.getTitleText()
      .then(title=>{
        savePost(this.props.postId, title,body);
        this.props.goBack();
      });
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonbar}>
          <Button title="cancel" onPress={this.cancel} /><Button title="save" onPress={this.save} />
        </View>
        <RichTextEditor
          ref={this.postRef}
          initialTitleHTML={this.props.postTitle}
          initialContentHTML={this.props.postText} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonbar: {
    flexDirection: "row",
    padding: 30
  }
});
