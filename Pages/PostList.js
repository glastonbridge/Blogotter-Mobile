import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import getPostList from "../DataModel/PostList"

export default class PostList extends React.Component {
  constructor(newProps) {
    super(newProps);
    this.state = {data: []};
  }

  componentDidMount = () => {
    //super.componentDidMount();
    getPostList().then(posts => {
      this.setState({data: posts});
    });
  }

  itemPressed = (key) => {
    this.props.showPost(key);
  }

  renderItem = (item) => {
    return (
      <PostRenderItem id={item.item.key} title={item.item.title} onPressItem={this.itemPressed} />
    )
  }

  render() {
    return (
      <FlatList style={styles.flatlist} data={this.state.data} renderItem={this.renderItem} />
    );
  }
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50
  },
  renderitem: {
    padding: 30
  }
});

class PostRenderItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity style={styles.renderitem} onPress={this._onPress}>
        <View>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
