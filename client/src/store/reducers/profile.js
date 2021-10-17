import {
  PROFILES_LOADED,
  PROFILE_UPDATE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  location: null,
  status: null,
  bio: null,
  imageUrl: null,
  profiles: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        location: action.payload.location,
        status: action.payload.status,
        bio: action.payload.bio,
        imageUrl: action.payload.imageUrl,
      };
    }
    case PROFILES_LOADED: {
      return {
        ...state,
        profiles: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
