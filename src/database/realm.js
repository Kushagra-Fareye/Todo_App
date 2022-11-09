import Realm from 'realm';
import {TodoStatus} from '../constants/TodoConstants';
import {TodoSchema} from './schema';

const idGenerator = realm => {
  let id = realm.objects('Todo').max('id');

  if (!id) id = 0;
  return id + 1;
};
export async function writeData(data) {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  try {
    data.id = idGenerator(realm);
    realm.write(() => {
      todo = realm.create('Todo', data);
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getAllData() {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  const data = realm.objects('Todo');
  return data;
}

export async function getTodosByStatus(filter) {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  const data = realm.objects('Todo').filtered(`status=='${filter}'`);
  return data;
}

export async function getRealmPath() {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  return realm.path;
}

export async function updateTodo(id, newStatus) {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  realm.write(() => {
    const oldTodo = realm.objects('Todo').filter(todo => todo.id === id)[0];
    oldTodo.status = newStatus;
  });
}

export async function deleteTodo(todo) {
  const realm = await Realm.open({
    path: 'TodoApplication',
    schema: [TodoSchema],
  });
  realm.write(() => {
    realm.delete(todo);
  });
}
