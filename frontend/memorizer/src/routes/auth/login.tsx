import { useForm } from 'react-hook-form';
import { trpc } from '../../trpc';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { USER_LOCAL_KEY } from '../../utils/CONST';
import { UserInfoAtom } from '../../states/userState';
import { LoginFormInterface } from '../../interfaces/LoginFormInterface';

export function LoginPage() {
  const set_user_info = useSetAtom(UserInfoAtom);
  const login_form = useForm<LoginFormInterface>();
  const navigate = useNavigate();

  const login_user_mutation = trpc.users.login.useMutation({
    onSuccess: (data) => {
      set_user_info(data);
      localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(data));
      navigate('/');
    }
  });

  return (
    <main>
      <form
        onSubmit={login_form.handleSubmit((data) => {
          login_user_mutation.mutate(data);
        })}
        style={{ border: '5px solid red' }}
      >
        <input
          type='email'
          placeholder='email'
          {...login_form.register('email')}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          {...login_form.register('password')}
        />
        <hr />
        <button>submit</button>
      </form>
    </main>
  );
}
