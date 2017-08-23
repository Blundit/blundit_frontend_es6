User = function reducer(state={
    data: {},
    votes: [],
  }, action) {
    // TODO: Update with proper cases
    switch (action.type) {
      case "ONE_THING": {
        return { ...state, var: action.payload }
      }
      case "ONE_THING_ERROR": {
        return { ...state, error: action.payload}
      }
    }
}

export default User;