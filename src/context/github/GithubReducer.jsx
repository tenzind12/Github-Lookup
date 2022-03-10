// import { data } from 'autoprefixer';

const githubReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR':
      return {
        ...state,
        users: [],
        loading: false,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    // <<==  MODIFIED DUE TO AXIOS (made one function in place of two)==>> //
    // case 'GET_USER':
    //   return {
    //     ...state,
    //     user: action.payload,
    //     loading: false,
    //   };
    // case 'GET_REPOS':
    //   return {
    //     ...state,
    //     repos: action.payload,
    //     loading: false,
    //   };
    default:
      return state;
  }
};

export default githubReducer;
