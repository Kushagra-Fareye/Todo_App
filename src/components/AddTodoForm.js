import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PageTypes} from '../constants/FormConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTodoForm = props => {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [name, setName] = useState('');

  const {openModal, toggleModal} = props.route.params;
  const [dueDate, setDueDate] = useState('');
  const [title, setTitle] = useState('');
  const [todoType, setTodoType] = useState('');

  const handleAddTodo = async () => {
    const data = await AsyncStorage.getItem('todos');
    const todos = JSON.parse(data);
    todos.push({
      title: title,
      type: todoType,
      dueDate,
    });
    console.log(todos, 'add form');
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setDueDate('');
    setTitle('');
    setTodoType('');
    props.route.params.toggleNewTodoAdded(true);
    props.navigation.pop();
  };

  const handleCancelCLick = async () => {
    setDueDate('');
    setTitle('');
    setTodoType('');
    props.navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Modal>
        <View style={styles.formContainer}>
          <Text style={styles.pageHeader}>Add Todo please</Text>
          <View style={styles.inputFieldsContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Todo Title"
              onChangeText={text => setDueDate(text)}
              value={dueDate}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Enter Due date"
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Enter Todo Type"
              value={todoType}
              onChangeText={text => setTodoType(text)}
            />
            <View style={styles.buttonContainer}>
              <Text style={styles.button} onPress={handleCancelCLick}>
                Cancel
              </Text>
              <Text style={styles.button} onPress={handleAddTodo}>
                Add todo
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '80%',
    marginTop: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  pageHeader: {
    fontSize: 40,
    // marginBottom: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  inputField: {
    borderColor: 'white',
    width: 250,
    height: 80,
    fontSize: 18,
    borderBottomColor: 'black',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddTodoForm;

// return (

//   );
