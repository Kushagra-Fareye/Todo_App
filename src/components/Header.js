import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontStyle: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black',
    marginVertical: 30,
  },
});
