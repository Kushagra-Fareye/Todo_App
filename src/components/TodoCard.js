import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function TodoCard(props) {
  const {todo} = props;
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.icon}
        source={
          todo.type === 'professional'
            ? require('../assets/professional.png')
            : require('../assets/personal.png')
        }
      />
      <Text style={styles.todoTitle}>{todo.title}</Text>
      <Text style={styles.todoDate}>{todo.dueDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'contain',
    margin: 20,
  },
  todoDate: {
    flex: 3,
    fontSize: 20,
    alignSelf: 'center',
  },
  todoTitle: {flex: 5, fontSize: 20, alignSelf: 'center'},
});
