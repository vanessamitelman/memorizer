import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

export function FormPropsTextFields() {
  return (
    <div>
      Material UI form components
      <Stack
        component='form'
        sx={{
          width: '25ch'
        }}
        spacing={2}
        noValidate
        autoComplete='off'
      >
        <TextField id='email' label='Email' variant='filled' />

        <TextField
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
        />
      </Stack>
    </div>
  );
}
