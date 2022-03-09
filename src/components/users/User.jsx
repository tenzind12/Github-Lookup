import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../../context/github/GithubContext';

function User() {
  const { getUser, user } = useContext(GithubContext);

  const params = useParams(); //import useParams() to get login from url

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{user.login}</div>;
}

export default User;
