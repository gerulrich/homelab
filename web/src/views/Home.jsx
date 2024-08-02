import useAuth from '@app/components/guards/UseAuth';

const Home = () => {
  const { user } = useAuth();
  return (<h1>Hola {user?.name}!</h1>)
}

export default Home
