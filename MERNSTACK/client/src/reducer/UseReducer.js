export const initialState=null;

export const reducer = (state, action) => {
    switch (action.type) {
      case 'USER':
        return action.payload;
      // Handle other action types if needed
      default:
        return state;
    }
  };