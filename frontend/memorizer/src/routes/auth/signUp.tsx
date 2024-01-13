import { useForm } from 'react-hook-form';
import { trpc } from '../../trpc';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { USER_LOCAL_KEY } from '../../utils/CONST';
import { UserInfoAtom } from '../../states/userState';
import { SignUpFormInterface } from '../../interfaces/SignUpFormInterface';
import { useAuth } from '../../context/AuthContext';

export function SignUp() {
  const { login } = useAuth();
  const [user_info, set_user_info] = useAtom(UserInfoAtom);
  const sign_up_form = useForm<SignUpFormInterface>();
  const navigate = useNavigate();

  const create_user_mutation = trpc.users.create.useMutation({
    onSuccess: (data) => {
      set_user_info(data);
      localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(data));
      login('user');
      navigate('/dashboard');
    }
  });

  return (
    <main>
      user = {JSON.stringify(user_info, null, 2)}
      <form
        onSubmit={sign_up_form.handleSubmit((data) => {
          console.log(data);
          create_user_mutation.mutate(data);
        })}
        style={{ border: '5px solid green' }}
      >
        <input
          type='email'
          placeholder='email'
          {...sign_up_form.register('email')}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          {...sign_up_form.register('password')}
        />
        <hr />
        <button>submit</button>
      </form>
    </main>
  );
}
