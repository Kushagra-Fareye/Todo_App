import Realm from 'realm';
import {TodoSchema} from './schema';

const realm = await Realm.open({
  path: 'RealmDB',
  schema: [TodoSchema],
});

const writeData = async data => {
  realm.create('Todo', {
    data,
  });
  console.log('something');
  const data1 = realm.objects('Todo');
  console.log('hereis data', data1);
};

const getAllData = () => {
  const data = realm.objects('Todo');
  return data;
};

const getTodosByStatus = filter => {
  const data = realm.objects('Todo').filtered(`status=${filter}`);
  return data;
};

export {writeData, getAllData, getTodosByStatus};
