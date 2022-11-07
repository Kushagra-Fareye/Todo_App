import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TodoCard from './TodoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Header from './Header';

let pageType = 'todos';
export default function List({route, navigation}) {
  const isFocused = useIsFocused();
  if (route?.params) {
    pageType = route.params.pageType;
  }
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const storedData = await AsyncStorage.getItem(pageType);
    const res = JSON.parse(storedData);
    if (res) setData(res);
  };
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  return (
    <>
      <View style={styles.mainContainer}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <View style={styles.navContainer}>
            <View style={styles.navigationButtons}>
              <Text
                style={styles.button}
                onPress={() => navigation.push('Todos', {pageType: 'todos'})}>
                Todos
              </Text>
              <Text
                style={styles.button}
                onPress={() =>
                  navigation.push('Completed Todos', {
                    pageType: 'completedTodos',
                  })
                }>
                Completed
              </Text>
              <Text
                style={styles.button}
                onPress={() =>
                  navigation.push('In Progress Todos', {
                    pageType: 'inProgressTodos',
                  })
                }>
                InProgress
              </Text>
            </View>
          </View>

          {data && data.length ? (
            <ScrollView style={styles.cardContainer}>
              {data.map((todo, i) => {
                return <TodoCard todo={todo} key={i} />;
              })}
            </ScrollView>
          ) : (
            <Text style={styles.emptyList}>Nothing To display</Text>
          )}

          <Text
            onPress={() => navigation.navigate('Add Todo Form')}
            style={styles.modalbutton}>
            Add Todo
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    backgroundColor: 'grey',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 5,
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignContent: 'center',
    elevation: 6,
    backgroundColor: 'white',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -40,
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    overflow: 'scroll',
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
    elevation: 10,
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
  cardContainer: {flex: 8},
  emptyList: {
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 70,
    color: 'black',
  },
});
