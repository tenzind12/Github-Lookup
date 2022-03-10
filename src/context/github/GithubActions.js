import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// OPTIONAL AXIOS FOR CLEANER CODE
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});
//=========================== GET SEARCH RESULT =========================//
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?sort=updated&per_page=10`),
  ]);

  return { user: user.data, repos: repos.data };
};

// const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
//   headers: { Authorization: `token ${GITHUB_TOKEN}` },
// });

// // const data = await response.json();
// // destructuring items from data object === data.items
// const { items } = await response.json();

// return items;

// =========================== GET SINGLE USER ==========================//
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: { Authorization: `token ${GITHUB_TOKEN}` },
//   });

//   if (response.status === 404) {
//     window.location = '/notfound';
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };

// =========================== GET USER REPOS ==========================//
// export const getUserRepos = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?sort=updated&per_page=10`, {
//     headers: { Authorization: `token ${GITHUB_TOKEN}` },
//   });

//   const data = await response.json();
//   return data;
// };
