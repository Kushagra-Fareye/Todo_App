export const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'int',
    title: 'string',
    status: 'string',
    dueDate: 'string',
    dueTime: 'string',
    type: 'string',
  },
  primaryKey: 'id',
};
