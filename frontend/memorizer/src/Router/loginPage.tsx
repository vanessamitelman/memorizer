import { GoogleLogin } from '@react-oauth/google';
import { decode } from 'jwt-js-decode';
import { trpc } from '../trpc';

export function LoginPage() {
  const google_user_mutation = trpc.users.createGoogleUser.useMutation({
    onSuccess: () => {
      console.log('success');
    }
  });
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
          await console.log(credentialResponse);
          if (credentialResponse.credential === undefined) return;
          const {
            payload: { email, sub }
          } = await decode(credentialResponse.credential);
          await console.log(email, sub);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </main>
  );
}
