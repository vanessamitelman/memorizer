import { GoogleLogin } from '@react-oauth/google';
import { decode } from 'jwt-js-decode';
import { trpc } from '../trpc';
import { atom, useAtom } from 'jotai';

export const userAtom = atom<{
  id: number;
  email: string;
  // Add other user-related information as needed
} | null>(null);

export function LoginPage() {
  const [user, setUser] = useAtom(userAtom);

  // Function to handle user login

  const google_user_mutation = trpc.users.googleUser.useMutation({
    onSuccess: () => {
      console.log('success');
    }
  });
  const handleUserLogin = (id: number, email: string) => {
    const loggedInUser = {
      id,
      email
    };

    setUser(loggedInUser);
  };
  return (
    <main>
      <h1>Login Page</h1>
      <p>
        Here there will be an option to login with google or login with email
        and password. There will be a forgot password link, and create an
        account link
      </p>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential === undefined) return;
          const {
            payload: { email, sub }
          } = await decode(credentialResponse.credential);
          const get_user_query = trpc.users.getUserByEmail.useQuery(email);
          if (get_user_query.isLoading || get_user_query.data === undefined)
            <div>Loading...</div>;
          if (get_user_query.data === undefined || get_user_query.data === null)
            return <div>Data doesn't exists</div>;
          handleUserLogin(get_user_query.data.id, email);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </main>
  );
}
