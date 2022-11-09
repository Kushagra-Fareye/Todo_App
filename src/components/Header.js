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
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black',
    marginVertical: 30,
  },
});
