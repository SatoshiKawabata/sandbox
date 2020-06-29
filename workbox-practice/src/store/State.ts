export interface ITodo {
  uid: string;
  label: string;
  done: boolean;
}

export interface IState {
  todos: ITodo[];
  inputLabel: string;
}

const savedState = JSON.parse(localStorage.getItem("state"));
export const initialState: IState = savedState
  ? savedState
  : {
      todos: [
        {
          label: "Task",
          done: false,
          uid: "test-task"
        }
      ],
      inputLabel: ""
    };
