export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any}

  constructor (reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value () {
    return this.state
  }

  subscribe = (fn) => {
    this.subscribers = [...this.subscribers, fn]
    console.log(this.subscribers)
    this.notify()
    return (): void => {
      console.log('FN = ', fn)
      this.subscribers = this.subscribers.filter(sub => sub !== fn)
    }
  }

  dispatch = (action): void => {
    this.state = this.reduce(this.state, action)
    this.notify()
  }

  private notify = (): void => {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce = (state, action): { [key: string]: any} => {
    const newState = {}
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}