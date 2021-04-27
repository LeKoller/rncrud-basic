import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {ListItem, Avatar, Button, Icon} from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getAction(user) {
    return props.navigation.navigate('UserForm', user);
  }

  function getUserItem({item: user}) {
    return (
      <ListItem key={user.id.toString()} bottomDivider>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          <View style={buttonCaseStyle}>
            <Button
              onPress={() => getAction(user)}
              type="clear"
              icon={<Icon name="edit" size={25} color="slategray" />}
            />
            <Button
              onPress={() => confirmUserDeletion(user)}
              type="clear"
              icon={<Icon name="delete" size={25} color="red" />}
            />
          </View>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};

const buttonCaseStyle = {
  position: 'absolute',
  right: 0,
  display: 'flex',
  flexDirection: 'row',
};
