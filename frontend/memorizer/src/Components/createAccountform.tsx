import TextField from '@mui/material/TextField';
import { Button, Stack } from '@mui/material';
import { trpc } from '../trpc';
import { useForm } from 'react-hook-form';

export function CreateAccountForm() {
  const create_Account_mutation = trpc.users.createUser.useMutation({
    onSuccess: () => {
      console.log('success');
    }
  });
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  return (
    <div>
      <Stack
        component='form'
        sx={{
          width: '25ch'
        }}
        spacing={2}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit((data) => {
          console.log('sf');
        })}
      >
        <TextField
          id='email'
          label='Email'
          variant='filled'
          {...register('email')}
        />

        <TextField
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
          {...register('password')}
        />
        <Button>Create Account</Button>
      </Stack>
    </div>
  );
}
