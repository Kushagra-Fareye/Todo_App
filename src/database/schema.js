export const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'int',
    title: 'string',
    status: 'string',
    dueDate: 'Date',
  },
  primaryKey: 'id',
};
