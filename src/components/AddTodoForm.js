import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {AlertMessages} from '../constants/FormConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoType} from '../constants/TodoConstants';

const AddTodoForm = props => {
  const [dueDate, setDueDate] = useState('');
  const [title, setTitle] = useState('');
  const [isTodoTypePersonal, toggleTodoType] = useState(true);

  const isDatevalid = date => {
    let dateValidator =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return !dateValidator.test(date);
  };

  const handleAddTodo = async () => {
    if (title === '') {
      Alert.alert('Invalid', AlertMessages.emptyTitle);
      return;
    }
    if (isDatevalid(dueDate)) {
      Alert.alert('Invalid', AlertMessages.wrongDate);
      setDueDate('');
      return;
    }
    const data = await AsyncStorage.getItem('todos');
    const todos = JSON.parse(data);
    todos.push({
      title: title,
      type: isTodoTypePersonal ? TodoType.PERSONAL : TodoType.PROFESSIONAL,
      dueDate,
    });
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    setDueDate('');
    setTitle('');
    toggleTodoType(true);
    props.navigation.pop();
  };

  const handleCancelCLick = async () => {
    setDueDate('');
    setTitle('');
    toggleTodoType(true);
    props.navigation.pop();
  };
  return (
    <View style={styles.container}>
      <Modal>
        <View style={styles.formContainer}>
          <Text style={styles.pageHeader}>Add Todos</Text>
          <View style={styles.inputFieldsContainer}>
            <TextInput
              style={styles.inputField}
              placeholder="Enter Todo Title"
              onChangeText={text => setTitle(text)}
              value={title}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Enter Due date"
              value={dueDate}
              onChangeText={text => setDueDate(text)}
            />

            <View style={styles.todoTypeContainer}>
              <Text style={styles.todoType}>Personal</Text>
              <Switch
                style={styles.todoSwitch}
                onValueChange={() => toggleTodoType(!isTodoTypePersonal)}
                value={!isTodoTypePersonal}
              />
              <Text style={styles.todoType}>Professional</Text>
            </View>

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
  },
  pageHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    fontWeight: 'bold',
    fontSize: 22,
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#841584',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
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
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todoTypeContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  todoSwitch: {
    margin: 10,
  },
});

export default AddTodoForm;
