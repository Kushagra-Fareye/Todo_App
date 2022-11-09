import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Switch,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {AlertMessages} from '../constants/FormConstants';
import {TodoType} from '../constants/TodoConstants';
import {writeData} from '../database/realm';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodoForm = props => {
  const [title, setTitle] = useState('');
  const [isTodoTypePersonal, toggleTodoType] = useState(true);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const handleAddTodo = async () => {
    if (title === '') {
      Alert.alert('Invalid', AlertMessages.emptyTitle);
      return;
    }
    const todo = {
      title,
      dueDate: date.toLocaleDateString(),
      dueTime: time.toLocaleTimeString(),
      type: isTodoTypePersonal ? TodoType.PERSONAL : TodoType.PROFESSIONAL,
      status: 'todos',
    };
    await writeData(todo);
    setTitle('');
    toggleTodoType(true);
    props.navigation.pop();
  };

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }
  const getTimeFromDate1 = timestamp => new Date(timestamp * 1000).getTime();
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  const handleCancelCLick = async () => {
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

            <View style={styles.pickerContainer}>
              <Text style={styles.dateTimeShow}>
                Date : {date.toDateString().substring(4)}
              </Text>
              {!datePicker && (
                <View style={styles.dateTimePicker}>
                  <Button
                    title="Select Date"
                    color="green"
                    onPress={showDatePicker}
                  />
                </View>
              )}
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.dateTimeShow}>
                Time : {time.toLocaleTimeString()}
              </Text>
              {!timePicker && (
                <View style={styles.dateTimePicker}>
                  <Button
                    title="Select Time"
                    color="green"
                    onPress={showTimePicker}
                  />
                </View>
              )}
            </View>
            {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                minimumDate={new Date()}
                onChange={onDateSelected}
              />
            )}
            {timePicker && (
              <DateTimePicker
                value={time}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                minimumDate={new Date()}
                onChange={onTimeSelected}
              />
            )}
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
    marginVertical: 30,
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
  dateTimeShow: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  pickerContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default AddTodoForm;
