import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

function Home() {
  return (
    <>
      {/* search components */}
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
