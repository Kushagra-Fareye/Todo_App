/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AddTodoForm, LoginForm, Header, List} from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  AsyncStorage.setItem(
    'completedTodos',
    JSON.stringify([
      {title: 'something', dueDate: 'dueDate', type: 'professional'},
      {title: 'something', dueDate: 'dueDate', type: 'professional'},
      {title: 'something', dueDate: 'dueDate', type: 'professional'},
      {title: 'something', dueDate: 'dueDate', type: 'personal'},
      {title: 'something', dueDate: 'dueDate', type: 'personal'},
    ]),
  );
  AsyncStorage.setItem('todos', JSON.stringify([]));
  AsyncStorage.setItem('inProgressodos', JSON.stringify([]));

  return (
    <>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          {isLoggedIn ? (
            <View style={styles.body}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Todos" component={List} />
                <Stack.Screen name="Completed Todos" component={List} />
                <Stack.Screen name="In Progress Todos" component={List} />
                <Stack.Screen name="Add Todo Form" component={AddTodoForm} />
              </Stack.Navigator>
            </View>
          ) : (
            <>
              <Header style={styles.header} />
              <LoginForm
                style={styles.body}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </>
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
  body: {
    flex: 5,
  },
});

export default App;
