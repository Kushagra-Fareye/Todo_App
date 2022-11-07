import Realm from 'realm';
import {TodoSchema, TodoSchema1} from './schema';

const idGenerator = realm => {
  let id = realm.objects('Todo').max('id');
  console.log(id);
  if (!id) id = 0;
  return id + 1;
};
export async function writeData(data) {
  const realm = await Realm.open({
    path: 'RealmDB',
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
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  const data = realm.objects('Todo');
  return data;
}

export async function getTodosByStatus(filter) {
  const realm = await Realm.open({
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  const data = realm.objects('Todo').filtered(`status=='${filter}'`);
  return data;
}

export async function getRealmPath() {
  const realm = await Realm.open({
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  return realm.path;
}

export async function updateTodo(id) {
  const realm = await Realm.open({
    path: 'RealmDB',
    schema: [TodoSchema],
  });
  const todo = realm.objects('Todo').filtered(`id==${id}`);
}
