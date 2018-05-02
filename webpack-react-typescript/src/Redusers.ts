export interface IState {
  count: number;
};

const initialState: IState = {
  count: 0
};

export const Redusers = (state: IState = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    default:
      return state;
  }
};