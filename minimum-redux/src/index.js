const initialState = {
  todos: []
};

class Store {
  constructor(reducer) {
    this.listeners = [];
    this.reducer = reducer;
    this.state = initialState;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
  }
}

const Reducer = (state, action) => {

  switch (action.type) {
    case "ADD_TODO":
      state.todos.push(action.todo);
      return state;

    default:
      return state;
  }
};

const ActionCreator = {
  addTodo: todo => {
    return {
      type: "ADD_TODO",
      todo
    };
  }
};

module.exports = {
  Store,
  Reducer,
  ActionCreator
};