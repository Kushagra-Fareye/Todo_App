import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AddTodoForm, List, TodoCard} from '../components';

export default function TodoPage({navigation}) {
  // AsyncStorage.getItem('incompleteTodos'),
  // AsyncStorage.getItem('completedTodos'),
  // AsyncStorage.getItem('inProgressTodos'),

  const [todoList, updateTodoList] = useState([
    {title: 'something', type: 'personal'},
    {title: 'something 1', type: 'professinal'},
  ]);

  const [completedTodoList, updateCompletedTodoList] = useState([
    {title: 'something', type: 'personal'},
    {title: 'something 1', type: 'professinal'},
  ]);

  const [inProgressTodoList, updateInProgressTodoList] = useState([
    {title: 'something', type: 'personal'},
    {title: 'something 1', type: 'professinal'},
  ]);
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
      <View style={styles.navigationButtons}>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Todos')}>
          Todos
        </Text>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('Completed Todos')}>
          Completed
        </Text>
        <Text
          style={styles.button}
          onPress={() => navigation.navigate('In Progress Todos')}>
          InProgress
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: 'white',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignContent: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -40,
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  button: {
    fontSize: 19,
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  modalbutton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    padding: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'skyblue',
  },
});
