const {
  Store,
  Reducer,
  ActionCreator
} = require("./index");


describe("test", () => {
  const store = new Store(Reducer);

  it("", done => {
    store.subscribe(state => {
      expect(state.todos.length).toBe(1);
      expect(state.todos).toEqual(["test todo"]);
      done();
    });

    store.dispatch(ActionCreator.addTodo("test todo"));
  });
});
