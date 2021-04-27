import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import users from '../data/users';

export default props => {
  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id.toString()}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm')}>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <Text
            style={{
              position: 'absolute',
              right: 4,
            }}>
            Hi stranger
          </Text>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
