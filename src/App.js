/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Form, Header} from './components';

const App = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Header style={styles.header} />
      <Form style={styles.form} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  header: {
    flex: 1,
  },
  form: {
    flex: 5,
  },
});

export default App;
