const MyUserReduce = (currentState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
  }
  return currentState;

}

export default MyUserReduce;