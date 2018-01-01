export const ADD_TODO = '[Todo] Add Todo'

export class AddTodo {
  readonly type = ADD_TODO
  constructor (private payload: any) {}
}