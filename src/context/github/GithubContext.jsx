import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = { users: [], user: {}, repos: [], loading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // CLEAR ALL USERS
  const clearUsers = () => dispatch({ type: 'CLEAR', payload: [] });

  const setLoading = () => dispatch({ type: 'SET_LOADING' });
  // GET SEARCH RESULTS
  const searchUsers = async (text) => {
    setLoading(); // setting loading to true

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    // const data = await response.json();
    // destructuring items from data object === data.items
    const { items } = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // Get single user details
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // GET USER REPOS
  const getUserRepos = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?sort=created&per_page=10`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
