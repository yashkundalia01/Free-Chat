import {
    START_UPDATING,
    STOP_UPDATING,
  } from "../actions/actionTypes";

  const initialState = {
    updating: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case START_UPDATING: {
        return {
          ...state,
          updating: true
        };
      }
      case STOP_UPDATING: {
        return {
          ...state,
          updating: false
        };
      }
      default:
        return state;
    }
  };
  
  export default reducer;
  
  