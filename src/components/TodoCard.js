import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TodoStatus, TodoType} from '../constants/TodoConstants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {deleteTodo, updateTodo} from '../database/realm';

export default function TodoCard(props) {
  const {todo, data, setData} = props;
  console.log(todo);
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.icon}
            source={
              todo.type === TodoType.PROFESSIONAL
                ? require('../assets/professional.png')
                : require('../assets/personal.png')
            }
          />
          <Text style={styles.todoTitle}>{todo.title}</Text>

          <View style={styles.buttonContainer}>
            {todo.status !== TodoStatus.COMPLETED && (
              <TouchableOpacity
                onPress={async () => {
                  todo.status === TodoStatus.TODOS
                    ? updateTodo(todo.id, TodoStatus.IN_PROGRESS)
                    : updateTodo(todo.id, TodoStatus.COMPLETED);
                  setData(prev => prev.filter(data => data.id !== todo.id));
                }}>
                <Image
                  style={styles.button}
                  source={require('./../assets/completed.png')}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={async () => {
                deleteTodo(todo);
                setData(prev => prev.filter(data => data.id !== todo.id));
              }}>
              <Image
                style={
                  todo.status !== TodoStatus.COMPLETED
                    ? styles.button
                    : styles.singleButton
                }
                source={require('./../assets/remove.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.todoDate}>Due Date:</Text>
          <Text style={styles.todoDate}>{todo.dueDate}</Text>
          <Text style={styles.todoDate}>{todo.dueTime}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: 80,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },
  cardContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
    margin: 9,
  },
  todoTitle: {flex: 4, alignSelf: 'center'},
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    resizeMode: 'contain',
    height: 18,
    width: 18,
    margin: 2,
  },
  singleButton: {resizeMode: 'contain', height: 15, width: 15, margin: 20},
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  todoDate: {
    fontSize: 11,
  },
});
